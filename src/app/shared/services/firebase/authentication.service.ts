import { inject, Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  User,
  signOut,
} 
from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { Router } from '@angular/router';
import { NavbarService } from '../navbar.service';

const firebaseConfig = {
  apiKey: 'AIzaSyBmPjsLf9R76U3csMNtLgAhffJOZeh9Rvc',
  authDomain: 'join-82c5c.firebaseapp.com',
  projectId: 'join-82c5c',
  storageBucket: 'join-82c5c.firebasestorage.app',
  messagingSenderId: '27899760680',
  appId: '1:27899760680:web:a69a8cecc0f0971858a51d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  router = inject(Router);
  navbarService = inject(NavbarService);
  isLoginSignUpView: boolean = true;
  isSummaryAnnimationPlayedOnce: boolean = false;
  isLoginAnnimationPlayedOnce: boolean = false;
  isUserLoggedIn: boolean = false;
  currentLoggedInUser: User | null = null;
  GUESTUSER: { email: string; pw: string } = {
    email: 'guest@user.de',
    pw: '123456',
  };
  errorMessageForFailedFirebaseRequest: string = '';
  errorOccoursIn:
    | 'fullname'
    | 'email'
    | 'pw'
    | 'pwConfirm'
    | 'email-pw'
    | 'global'
    | null = null;

  // ##########################################################################################################
  // Authentication
  // ##########################################################################################################
  
  /**
   * Creates a new user with the given email and password using Firebase authentication.
   *
   * @param {string} email - The email address of the user.
   * @param {string} password - The password for the user account.
   * @returns {Promise<void>} A promise that resolves when the user is created or rejects if an error occurs.
   */
  async createUser(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        this.resetFirebaseError();
        // ...
      })
      .catch((error) => {
        this.setFirebaseError(error);
      });
  }

  /**
   * Logs in an existing user with the given email and password using Firebase authentication.
   *
   * @param {string} email - The email address of the user.
   * @param {string} password - The password for the user account.
   * @returns {Promise<void>} A promise that resolves when the user is logged in or rejects if an error occurs.
   */
  async login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        this.router.navigate(['/summary']);
        this.navbarService.setSelection('summary');
        this.isLoginSignUpView = false;
        this.resetFirebaseError();
      })
      .catch((error) => {
        this.setFirebaseError(error);
      });
  }

  /**
   * Logs out the current authenticated user using Firebase authentication.
   * Redirects the user to the home page after successful logout.
   *
   * @returns {Promise<void>} A promise that resolves when the user is logged out or rejects if an error occurs.
   */
  async logout() {
    await signOut(auth)
      .then(() => {
        // Signed out
        this.router.navigate(['/']);
        this.isLoginSignUpView = true;
        this.resetFirebaseError();
        // ...
      })
      .catch((error) => {
        this.setFirebaseError(error);
      });
  }

  /**
   * Checks the authentication state of the user. If a user is signed in, sets the user data
   * and returns `true`. If the user is signed out, clears the user data and returns `false`.
   *
   * @returns {Promise<boolean>} A promise that resolves with `true` if a user is logged in,
   *                             and `false` if the user is not logged in.
   */ async checkLogin(): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          this.currentLoggedInUser = user;
          this.isUserLoggedIn = true;
          resolve(true);
        } else {
          // User is signed out
          this.currentLoggedInUser = null;
          this.isUserLoggedIn = false;
          resolve(false);
        }
      });
    });
  }

  /**
   * Updates the authenticated user's profile with the provided full name.
   * If the user is authenticated, the profile's display name will be updated.
   *
   * @param {string} fullName - The new full name to set as the user's display name.
   * @returns {Promise<void>} A promise that resolves when the profile is successfully updated or rejects if an error occurs.
   */
  async updateUser(fullName: string) {
    const user: User | null = auth.currentUser;
    if (user) {
      await updateProfile(user, {
        displayName: fullName,
      })
        .then(() => {
          // Profile updated!
          this.errorOccoursIn = null;
        })
        .catch((error) => {
          // An error occurred
          this.setFirebaseError(error);
        });
    }
  }

  /**
   * Sets the appropriate error message based on the Firebase authentication error code.
   * Updates the error message and the field where the error occurred.
   *
   * @param {any} error - The error object returned by Firebase containing error details.
   */
  setFirebaseError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.errorOccoursIn = 'email';
        this.errorMessageForFailedFirebaseRequest = 'Email is already in use';
        break;
      case 'auth/weak-password':
        this.errorOccoursIn = 'pw';
        this.errorMessageForFailedFirebaseRequest =
          'Weak password. Use at least 6 characters';
        break;
      case 'auth/invalid-credential':
        this.errorOccoursIn = 'email-pw';
        this.errorMessageForFailedFirebaseRequest =
          'Check your email and password. Please try again.';
        break;

      default:
        this.errorOccoursIn = 'global';
        this.errorMessageForFailedFirebaseRequest =
          'Technical Error, please try again later';
    }
  }

  /**
   * Resets the Firebase error state by clearing the error field and message.
   * This function is typically called when the error has been resolved or cleared.
   */
  resetFirebaseError() {
    this.errorOccoursIn = null;
    this.errorMessageForFailedFirebaseRequest = '';
  }
}

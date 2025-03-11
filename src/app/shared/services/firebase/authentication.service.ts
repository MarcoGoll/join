import { inject, Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  User,
  signOut,
  beforeAuthStateChanged,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

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
  isLoginDisplayed: boolean = false;
  isSignupDisplayed: boolean = false;
  isMainContentDisplayed: boolean = false;
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

  isUserLoggedIn: boolean = false;
  currentLoggedInUser: User | null = null;

  // ##########################################################################################################
  // Authentication
  // ##########################################################################################################
  //Sign up new users
  async createUser(email: string, password: string) {
    // const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log('Erstellter User: ', user);
        this.resetFirebaseError();
        // ...
      })
      .catch((error) => {
        this.setFirebaseError(error);
      });
  }

  // Sign in existing users
  async login(email: string, password: string) {
    // const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        this.isLoginDisplayed = false;
        this.isSignupDisplayed = false;
        this.isMainContentDisplayed = true;
        this.resetFirebaseError();
      })
      .catch((error) => {
        this.setFirebaseError(error);
      });
  }

  async logout() {
    // const auth = getAuth();
    await signOut(auth)
      .then(() => {
        // Signed out
        console.log('User was logged out right now');
        this.isLoginDisplayed = true;
        this.isSignupDisplayed = false;
        this.isMainContentDisplayed = false;
        this.resetFirebaseError();
        // ...
      })
      .catch((error) => {
        this.setFirebaseError(error);
      });
  }

  //Set an authentication state observer and get user data
  async checkLogin(): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          this.currentLoggedInUser = user;
          this.isUserLoggedIn = true;
          resolve(true);
          console.log('SERVICE: This User is logged in: ', user);
          console.log('SERVICE: isUserLoggedIn', this.isUserLoggedIn);
        } else {
          // User is signed out
          this.currentLoggedInUser = null;
          this.isUserLoggedIn = false;
          console.log('SERVICE: No User is logged in');
          console.log('SERVICE: isUserLoggedIn', this.isUserLoggedIn);
          resolve(false);
        }
      });
    });
  }

  //Update a user's profile
  async updateUser(fullName: string) {
    // const auth = getAuth();
    const user: User | null = auth.currentUser;
    if (user) {
      await updateProfile(user, {
        displayName: fullName,
      })
        .then(() => {
          // Profile updated!
          console.log('Update Erfolgreich: ', user);
          this.errorOccoursIn = null;
        })
        .catch((error) => {
          // An error occurred
          this.setFirebaseError(error);
        });
    }
  }

  setFirebaseError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        console.log('Email is already in use');
        this.errorOccoursIn = 'email';
        this.errorMessageForFailedFirebaseRequest = 'Email is already in use';
        break;
      case 'auth/weak-password':
        console.log('Weak-password');
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
        console.log('error.code:', error.code);
        this.errorOccoursIn = 'global';
        this.errorMessageForFailedFirebaseRequest =
          'Technical Error, please try again later';
    }
  }

  resetFirebaseError() {
    this.errorOccoursIn = null;
    this.errorMessageForFailedFirebaseRequest = '';
  }
}

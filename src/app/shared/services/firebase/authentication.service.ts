import { inject, Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  User,
  signOut,
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
  isLoginDisplayed: boolean = true;
  isSignupDisplayed: boolean = false;
  isMainContentDisplayed: boolean = false;
  GUESTUSER: { email: string; pw: string } = {
    email: 'guest@user.de',
    pw: '123456',
  };

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$ = this.isUserLoggedInSubject.asObservable();

  constructor() {
    this.setAuthenticationStateObserver();
  }

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
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Fehler beim Erstellen:', errorCode, errorMessage);
        // ..
      });
  }

  // Sign in existing users
  async login(email: string, password: string) {
    // const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('This User was loged in right now: ', user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error durring Login: ', errorCode, errorMessage);
      });
  }

  async logout() {
    // const auth = getAuth();
    await signOut(auth)
      .then(() => {
        // Signed out
        console.log('User was loged out right now');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error durring Logout: ', errorCode, errorMessage);
      });
  }

  //Set an authentication state observer and get user data
  private setAuthenticationStateObserver() {
    onAuthStateChanged(auth, (user) => {
      this.currentUserSubject.next(user);
      if (user) {
        this.isUserLoggedInSubject.next(true);
      } else {
        this.isUserLoggedInSubject.next(false);
      }
      // if (user) {
      //   // User is signed in, see docs for a list of available properties
      //   // https://firebase.google.com/docs/reference/js/auth.user
      //   const uid = user.uid;
      //   console.log('This User is currently loged in: ', user);
      //   // ...
      // } else {
      //   // User is signed out
      //   // ...
      // }
    });
  }

  /** Wartet auf das erste Auth-Update */
  async waitForAuth(): Promise<User | null> {
    return firstValueFrom(this.currentUser$); // Wartet, bis der erste Wert eintrifft
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
        })
        .catch((error) => {
          // An error occurred
          console.error('Fehler beim Update: ', error);
        });
    }
  }
}

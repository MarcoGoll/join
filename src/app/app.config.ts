import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"join-82c5c","appId":"1:27899760680:web:a69a8cecc0f0971858a51d","storageBucket":"join-82c5c.firebasestorage.app","apiKey":"AIzaSyBmPjsLf9R76U3csMNtLgAhffJOZeh9Rvc","authDomain":"join-82c5c.firebaseapp.com","messagingSenderId":"27899760680"}))), importProvidersFrom(provideFirestore(() => getFirestore())), provideAnimationsAsync()]
}; 

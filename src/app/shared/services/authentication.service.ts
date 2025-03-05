import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoginDisplayed: boolean = false;
  isSignupDisplayed: boolean = true;
  isMainContentDisplayed: boolean = false;

  constructor() {}
}

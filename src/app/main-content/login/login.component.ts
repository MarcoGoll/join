import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../shared/services/firebase/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NavbarService } from '../../shared/services/navbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login.responsive.scss'],
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  authenticationService = inject(AuthenticationService);
  navbarService = inject(NavbarService);

  email: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;
  showAnimation: boolean = false;

  /**
   * ngOnInit - Initializes the login status and error handling.
   * Resets the display for login and any error messages.
   */
  ngOnInit(): void {
    this.authenticationService.isLoginSignUpView = true;
    this.authenticationService.errorOccoursIn = null;
    this.authenticationService.errorMessageForFailedFirebaseRequest = '';
  }

  /**
   * Constructor - Performs checks for login and first visit.
   * Calls `checklogin` and `checkFirstVisit` when the component is created.
   */
  constructor() {
    this.checklogin();
    this.checkFirstVisit();
  }

  /**
   * checklogin - Checks the user's login status.
   * Redirects the user to the summary page if they are logged in.
   */
  async checklogin() {
    await this.authenticationService.checkLogin();
    if (this.authenticationService.isUserLoggedIn) {
      this.router.navigate(['/summary']);
      this.navbarService.setSelection('summary');
    }
  }

  /**
   * checkFirstVisit - Checks if the user is visiting the login page for the first time.
   * Displays an animation on the first visit and sets a marker once it has been played.
   */
  checkFirstVisit() {
    if (!this.authenticationService.isLoginAnnimationPlayedOnce) {
      this.showAnimation = true;
      setTimeout(() => {
        this.showAnimation = false;
        this.authenticationService.isLoginAnnimationPlayedOnce = true;
      }, 2000);
    }
  }

  /**
   * login - Logs the user in with an email and password.
   * Calls the login function of the authentication service.
   */
  login(email: string, pw: string) {
    this.authenticationService.login(email, pw);
  }

  /**
   * loginAsGuest - Logs the user in as a guest.
   * Uses predefined guest user data from the authentication service.
   */
  loginAsGuest() {
    this.authenticationService.login(
      this.authenticationService.GUESTUSER.email,
      this.authenticationService.GUESTUSER.pw
    );
  }

  /**
   * toggleIsPasswordVisible - Toggles the visibility of the password.
   * Changes the state of password visibility.
   */
  toggleIsPasswordVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  /**
   * onSubmit - Called upon form submission.
   * Marks all form inputs as touched and performs the login process if the form is valid.
   */
  onSubmit(ngForm: NgForm) {
    ngForm.control.markAllAsTouched();
    if (ngForm.submitted && ngForm.form.valid) {
      this.authenticationService.resetFirebaseError();
      this.login(this.email, this.password);
    }
  }
}

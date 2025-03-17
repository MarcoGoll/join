import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/firebase/authentication.service';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../shared/interfaces/user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', 'signup.responsive.scss'],
})
export class SignupComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  pwConfirmation: string = '';
  isPrivacyPolicyChecked: boolean = false;
  isPasswordVisible: boolean = false;
  isPasswordConfirmVisible: boolean = false;
  isPWDifferent = false;
  displayConfirmation = false;

  newUser: User = {
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    pw: '',
  };

  /**
   * Lifecycle hook that runs when the component initializes.
   * Sets authentication service properties related to login/signup state and error handling.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.authenticationService.isLoginSignUpView = true;
    this.authenticationService.errorOccoursIn = null;
    this.authenticationService.errorMessageForFailedFirebaseRequest = '';
  }

  /**
   * Toggles the visibility of the password field.
   */
  toggleIsPasswordVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  /**
   * Toggles the visibility of the password confirm field.
   */
  toggleIsPasswordConfirmVisible() {
    this.isPasswordConfirmVisible = !this.isPasswordConfirmVisible;
  }

  /**
   * Handles the form submission process by validating input, checking password equality,
   * and creating/updating the user if the form is valid.
   *
   * @param {NgForm} ngForm - The Angular form being submitted.
   * @returns {Promise<void>} A promise that resolves after user creation, update, and confirmation.
   */
  async onSubmit(ngForm: NgForm) {
    ngForm.control.markAllAsTouched();
    this.checkPwEquality();
    if (ngForm.submitted && ngForm.form.valid) {
      if (this.newUser.pw === this.pwConfirmation) {
        await this.createUser();
        await this.updateUser();
        await this.confirmCreation();
      }
    }
  }

  /**
   * Checks whether the entered passwords match and updates the `isPWDifferent` flag accordingly.
   */
  checkPwEquality() {
    if (this.newUser.pw === this.pwConfirmation) {
      this.isPWDifferent = false;
    } else {
      this.isPWDifferent = true;
    }
  }

  /**
   * Creates a new user by calling the authentication service with the user's email and password.
   *
   * @returns {Promise<void>} A promise that resolves when the user creation is complete.
   */
  async createUser() {
    await this.authenticationService.createUser(
      this.newUser.email,
      this.newUser.pw
    );
  }

  /**
   * Updates the user's information if no errors occurred during the authentication process.
   * Calls the authentication service to update the user's full name.
   *
   * @returns {Promise<void>} A promise that resolves when the user update is complete, if no errors occurred.
   */
  async updateUser() {
    if (this.authenticationService.errorOccoursIn == null) {
      await this.authenticationService.updateUser(this.newUser.fullName);
    }
  }

  /**
   * Confirms the user creation by updating the password state, displaying a confirmation message,
   * and logging the user out after a brief delay, if no errors occurred during authentication.
   *
   * @returns {Promise<void>} A promise that resolves when the confirmation process and logout are complete.
   */
  async confirmCreation() {
    if (this.authenticationService.errorOccoursIn == null) {
      this.isPWDifferent = false;
      this.displayConfirmation = true;
      setTimeout(async () => {
        await this.authenticationService.logout();
      }, 1025);
    }
  }
}

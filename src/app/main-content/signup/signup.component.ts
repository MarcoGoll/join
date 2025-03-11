import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../shared/services/firebase/authentication.service';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../shared/interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  authenticationService = inject(AuthenticationService);
  pwConfirmation: string = '';
  isPrivacyPolicyChecked: boolean = false;
  isPasswordVisible: boolean = false;
  isPasswordConfirmVisible: boolean = false;
  isPWDifferent = false;

  newUser: User = {
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    pw: '',
  };

  toggleIsPasswordVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleIsPasswordConfirmVisible() {
    this.isPasswordConfirmVisible = !this.isPasswordConfirmVisible;
  }

  async onSubmit(ngForm: NgForm) {
    ngForm.control.markAllAsTouched();
    if (this.newUser.pw === this.pwConfirmation) {
      this.isPWDifferent = false;
    } else {
      this.isPWDifferent = true;
    }

    if (ngForm.submitted && ngForm.form.valid) {
      if (this.newUser.pw === this.pwConfirmation) {
        await this.authenticationService.createUser(
          this.newUser.email,
          this.newUser.pw
        );
        if (this.authenticationService.errorOccoursIn == null) {
          await this.authenticationService.updateUser(this.newUser.fullName);
        }
        if (this.authenticationService.errorOccoursIn == null) {
          this.authenticationService.isSignupDisplayed = false;
          this.authenticationService.isLoginDisplayed = true;
          this.authenticationService.isMainContentDisplayed = false;
          this.isPWDifferent = false;
          await this.authenticationService.logout();
        }
      } else {
      }
    }
  }
}

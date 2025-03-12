import { Component, inject } from '@angular/core';
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
export class SignupComponent {
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
          this.isPWDifferent = false;
          this.displayConfirmation = true;
          setTimeout(async () => {
            await this.authenticationService.logout();
          }, 1025);
        }
      } else {
      }
    }
  }
}

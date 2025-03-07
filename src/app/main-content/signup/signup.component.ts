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

  newUser: User = {
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    pw: '',
  };

  async onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      if (this.newUser.pw === this.pwConfirmation) {
        await this.authenticationService.createUser(
          this.newUser.email,
          this.newUser.pw
        );
        await this.authenticationService.updateUser(this.newUser.fullName);
      } else {
        //TODO: ERROR PW DOES NOT MATCH
      }
    }
  }
}

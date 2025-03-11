import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../shared/services/firebase/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login.responsive.scss'],
})
export class LoginComponent {
  authenticationService = inject(AuthenticationService);

  email: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;

  login(email: string, pw: string) {
    this.authenticationService.login(email, pw);
  }

  loginAsGuest() {
    this.authenticationService.login(
      this.authenticationService.GUESTUSER.email,
      this.authenticationService.GUESTUSER.pw
    );
  }

  toggleIsPasswordVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(ngForm: NgForm) {
    ngForm.control.markAllAsTouched();
    if (ngForm.submitted && ngForm.form.valid) {
      this.authenticationService.resetFirebaseError();
      this.login(this.email, this.password);
    }
  }
}

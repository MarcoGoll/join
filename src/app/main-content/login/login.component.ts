import { Component, inject } from '@angular/core';
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
export class LoginComponent {
  router = inject(Router);
  authenticationService = inject(AuthenticationService);
  navbarService = inject(NavbarService);

  email: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;
  showAnimation: boolean = false;

  constructor() {
    this.checklogin();
    this.checkFirstVisit();
    console.log('Loginview: ', this.authenticationService.isLoginSignUpView);
  }

  async checklogin() {
    await this.authenticationService.checkLogin();
    if (this.authenticationService.isUserLoggedIn) {
      this.router.navigate(['/summary']);
      this.navbarService.setSelection('summary');
    }
  }

  checkFirstVisit() {
    if (!this.authenticationService.isLoginAnnimationPlayedOnce) {
      this.showAnimation = true;
      setTimeout(() => {
        this.showAnimation = false;
        this.authenticationService.isLoginAnnimationPlayedOnce = true;
      }, 2000);
    }
  }

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

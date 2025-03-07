import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './main-content/login/login.component';
import { SignupComponent } from './main-content/signup/signup.component';
import { AuthenticationService } from './shared/services/firebase/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NavbarComponent,
    RouterOutlet,
    LoginComponent,
    SignupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  title = 'join';

  async ngOnInit() {
    if (await this.authenticationService.checkLogin()) {
      this.authenticationService.isLoginDisplayed = false;
      this.authenticationService.isSignupDisplayed = false;
      this.authenticationService.isMainContentDisplayed = true;
    } else {
      this.authenticationService.isLoginDisplayed = true;
      this.authenticationService.isSignupDisplayed = false;
      this.authenticationService.isMainContentDisplayed = false;
    }
  }
}

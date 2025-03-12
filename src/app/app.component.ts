import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  Event,
  RouterOutlet,
} from '@angular/router';

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

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/':
            this.authenticationService.isLoginSignUpView = true;
            break;
          case '/login':
            this.authenticationService.isLoginSignUpView = true;
            break;
          case '/signUp':
            this.authenticationService.isLoginSignUpView = true;
            break;
          case '/legalNotice':
            this.authenticationService.isLoginSignUpView = false;
            break;
          case '/privacyPolicy':
            this.authenticationService.isLoginSignUpView = false;
            break;
          case '/contact':
            this.authenticationService.isLoginSignUpView = false;
            break;
          case '/board':
            this.authenticationService.isLoginSignUpView = false;
            break;
          case '/addTask':
            this.authenticationService.isLoginSignUpView = false;
            break;
          case '/info':
            this.authenticationService.isLoginSignUpView = false;
            break;
          case '/summary':
            this.authenticationService.isLoginSignUpView = false;
            break;
          default:
            break;
        }
      }
    });
  }

  async ngOnInit() {
    await this.authenticationService.checkLogin(); // bei Initial Load: wird ausgeführt
  }
}

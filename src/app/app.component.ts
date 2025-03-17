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
import { AuthenticationService } from './shared/services/firebase/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  title = 'join';

  /**
   * Constructor that initializes the component and listens for route changes.
   * Updates the `isLoginSignUpView` property based on the current route.
   *
   * @param {Router} router - The Angular Router service for navigation.
   */
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

  /**
   * Lifecycle hook that is called when the component is initialized.
   * Checks the user's login status by calling the authentication service.
   */
  async ngOnInit() {
    await this.authenticationService.checkLogin();
  }
}

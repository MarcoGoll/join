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
    console.log('App neu geladen');
    this.authenticationService.setAuthenticationStateObserver();
    if (this.authenticationService.isUserLoggedIn) {
      console.log(
        'User is logged in: ',
        this.authenticationService.currentLoggedInUser
      );
    } else {
      console.log('No User is logged in');
    }
  }
}

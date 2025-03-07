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
    const user = await this.authenticationService.waitForAuth();
    console.log(
      user ? 'User is logged in: ' + user.uid : 'No User is logged in'
    );

    // console.log('App neu geladen');
    // this.authenticationService.setAuthenticationStateObserver();
    // if (this.authenticationService.isUserLoggedin) {
    //   console.log(
    //     'User is logged in: ',
    //     this.authenticationService.currentLoggedinUser$
    //   );
    // } else {
    //   console.log('No User is logged in');
    // }
  }
}

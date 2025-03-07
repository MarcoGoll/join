import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../shared/services/firebase/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login.responsive.scss'],
})
export class LoginComponent {
  authenticationService = inject(AuthenticationService);

  login(email: string, pw: string) {
    this.authenticationService.login(email, pw);
  }

  loginAsGuest() {
    this.authenticationService.login(
      this.authenticationService.GUESTUSER.email,
      this.authenticationService.GUESTUSER.pw
    );
  }
}

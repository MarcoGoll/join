import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../shared/services/firebase/authentication.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  authenticationService = inject(AuthenticationService);
}

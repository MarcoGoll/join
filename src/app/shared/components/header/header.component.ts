import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/firebase/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header.responsive.scss'],
})
export class HeaderComponent {
  authenticationService = inject(AuthenticationService);

  navVisible = false;
}

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

  getShortcut(fullname: string | null | undefined) {
    let shortcut: string = '';
    if (fullname != null && fullname != undefined) {
      let words = fullname.split(' ');
      for (let word of words) {
        if (word.length > 0) {
          shortcut += word.charAt(0).toUpperCase();
        }
      }
    }
    return shortcut;
  }
}

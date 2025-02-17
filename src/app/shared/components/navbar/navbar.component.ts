import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, LegalNoticeComponent, PrivacyPolicyComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', './navbar.responsive.scss']
})
export class NavbarComponent {

}

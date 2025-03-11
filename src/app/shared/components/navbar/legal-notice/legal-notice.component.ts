import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss', './legal-notice.responsive.scss'],
})
export class LegalNoticeComponent {

}

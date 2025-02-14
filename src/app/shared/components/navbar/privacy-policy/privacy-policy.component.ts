import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

}

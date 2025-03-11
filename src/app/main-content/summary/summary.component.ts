import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../shared/services/firebase/authentication.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss', './summary.responsive.scss', 'summary.landscape.scss'],
})
export class SummaryComponent {
  authenticationService = inject(AuthenticationService);
} 

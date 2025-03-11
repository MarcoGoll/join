import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../shared/services/firebase/authentication.service';
import { TasksService } from '../../shared/services/firebase/tasks.service';
import { RouterLink } from '@angular/router';
import { NavbarService } from '../../shared/services/navbar.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './summary.component.html',
  styleUrls: [
    './summary.component.scss',
    './summary.responsive.scss',
    'summary.landscape.scss',
  ],
})
export class SummaryComponent {
  authenticationService = inject(AuthenticationService);
  taskService = inject(TasksService);
  navbarService = inject(NavbarService);
}

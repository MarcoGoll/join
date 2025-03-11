import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../services/firebase/tasks.service';
import { NavbarService } from '../../services/navbar.service';
import { AuthenticationService } from '../../services/firebase/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', './navbar.responsive.scss'],
})
export class NavbarComponent {
  taskService = inject(TasksService);
  navbarService = inject(NavbarService);
  authenticationService = inject(AuthenticationService);
}

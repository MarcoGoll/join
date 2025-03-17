import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
export class SummaryComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  taskService = inject(TasksService);
  navbarService = inject(NavbarService);
  isSmallScreen: boolean = window.innerWidth < 1024;

  showGreeting: boolean = true;
  greetingFadeOut: boolean = false;

  /**
   * Constructor that checks the screen size and adds an event listener for resizing.
   */
  constructor() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
  }

  /**
   * Called when the component is initialized. Resets the greeting after a delay.
   */
  ngOnInit() {
    setTimeout(() => {
      this.greetingFadeOut = true;
      setTimeout(() => {
        this.showGreeting = false;
        this.authenticationService.isSummaryAnnimationPlayedOnce = true;
      }, 1000);
    }, 2000);
  }

  /**
   * Checks the screen width and sets `isSmallScreen` to `true` if the screen is smaller than a specific px value.
   */
  checkScreenWidth(): void {
    this.isSmallScreen = window.innerWidth < 1024;
  }
}

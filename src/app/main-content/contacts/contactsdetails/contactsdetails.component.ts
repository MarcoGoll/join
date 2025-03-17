import { CommonModule } from '@angular/common';
import { Component, Input, isDevMode } from '@angular/core';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';

@Component({
  selector: 'app-contactsdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactsdetails.component.html',
  styleUrls: [
    './contactsdetails.component.scss',
    './contactsdetails.responsive.scss',
  ],
})
export class ContactsdetailsComponent {
  @Input('isMobileView') isMobileView: boolean = false;
  isMoreControlOverviewShown: boolean = false;
  isInitialLoad: boolean = true;

  /**
   * Constructor that initializes the ContactsService.
   * @param {ContactService} contactService - The service for managing contacts.
   */
  constructor(public contactService: ContactsService) {}

  /**
   * Toggles the display of additional control options.
   * Also sets the initialization status to false.
   */
  toggleMoreControlOverview() {
    this.isMoreControlOverviewShown = !this.isMoreControlOverviewShown;
    this.isInitialLoad = false;
  }

  /**
   * Resets the initial values.
   * Resets the initialization status and hides the advanced controls.
   */
  setInitialValues() {
    this.isInitialLoad = true;
    this.isMoreControlOverviewShown = false;
  }

  /**
   * Sets the contact editing to "visible".
   * Changes the service state to indicate that the edit mode is active.
   */
  showEditContact() {
    this.contactService.isEditContactViewed = true;
  }
}

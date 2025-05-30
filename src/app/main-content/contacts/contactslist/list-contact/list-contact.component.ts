import { Component, Input } from '@angular/core';
import { Contact } from '../../../../shared/interfaces/contact';
import { ContactsService } from '../../../../shared/services/firebase/contacts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss', 'list-contact.resonsive.scss'],
})
export class ListContactComponent {
  @Input('isMobileView') isMobileView: boolean = false;
  @Input('contact') contact: Contact = {
    id: '',
    firstName: '',
    lastName: '',
    fullName: '',
    nameShortcut: '',
    nameShortcutColorCode: 0,
    email: '',
    phone: '',
    img: '',
  };

  /**
   * Constructor for the class that injects the ContactService.
   * Provides the ContactService to the class.
   *
   * @param {ContactService} contactService - An instance of the ContactService made available to the class.
   */
  constructor(public contactService: ContactsService) {}
}

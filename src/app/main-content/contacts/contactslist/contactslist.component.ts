import { Component, Input } from '@angular/core';
import { Contact } from '../../../shared/interfaces/contact';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';
import { ListContactComponent } from './list-contact/list-contact.component';
import { timeout } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contactslist',
  standalone: true,
  imports: [ListContactComponent, CommonModule],
  templateUrl: './contactslist.component.html',
  styleUrls: [
    './contactslist.component.scss',
    './contactslist.responsive.scss',
  ],
})
export class ContactslistComponent {
  @Input('isMobileView') isMobileView: boolean = false;

  testContact: Contact = {
    firstName: 'test_firstName',
    lastName: 'test_lastName',
    fullName: 'test_fullName',
    nameShortcut: 'TT',
    nameShortcutColorCode: 1,
    email: 'test@email.de',
    phone: '123456789',
    img: '',
  };

  /**
   * Constructor of the class that injects the ContactService.
   * @param {ContactService} contactService - The service that manages contact operations.
   */
  constructor(public contactService: ContactsService) {}

  /**
   * Adds a new contact.
   * @param {Contact} contact - The contact to be added.
   */
  addContact(contact: Contact) {
    this.contactService.addContact(contact);
  }

  /**
   * Deletes an existing contact.
   * @param {Contact} contact - The contact to be deleted.
   */
  deleteContact(contact: Contact) {
    this.contactService.deleteContact(contact);
  }

  /**
   * Resets the database.
   * Deletes all saved contacts.
   */
  resetDatabase() {
    this.contactService.resetDatabase();
  }

  /**
   * Displays the form to add a new contact.
   */
  showAddContact() {
    this.contactService.isAddContactViewed = true;
  }
}

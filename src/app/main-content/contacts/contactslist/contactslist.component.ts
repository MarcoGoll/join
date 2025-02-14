import { Component } from '@angular/core';
import { Contact } from '../../../shared/interfaces/contact';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';
import { ListContactComponent } from "./list-contact/list-contact.component";
import { timeout } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contactslist',
  standalone: true,
  imports: [ListContactComponent, CommonModule],
  templateUrl: './contactslist.component.html',
  styleUrl: './contactslist.component.scss'
})
export class ContactslistComponent {

  testContact: Contact = {
    firstName: "test_firstName",
    lastName: "test_lastName",
    nameShortcut: "TT",
    nameShortcutColorCode: 1,
    email: "test@email.de",
    phone: "123456789",
    img: ""
  }

  constructor(public contactService: ContactsService) {
  }

  addContact(contact: Contact) {
    this.contactService.addContact(contact);
  }

  deleteContact(contact: Contact) {
    this.contactService.deleteContact(contact);
  }

  resetDatabase() {
    this.contactService.resetDatabase();
  }
}

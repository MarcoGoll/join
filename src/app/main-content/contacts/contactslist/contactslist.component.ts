import { Component } from '@angular/core';
import { Contact } from '../../../shared/interfaces/contact';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';
import { ListContactComponent } from "./list-contact/list-contact.component";
import { timeout } from 'rxjs';


@Component({
  selector: 'app-contactslist',
  standalone: true,
  imports: [ListContactComponent],
  templateUrl: './contactslist.component.html',
  styleUrl: './contactslist.component.scss'
})
export class ContactslistComponent {

  testContact: Contact = {
    firstName: "test_firstName",
    lastName: "test_lastName",
    nameShortcut: "TT",
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
    console.log(contact);
    this.contactService.deleteContact(contact);
  }

  resetDatabase() {
    this.contactService.resetDatabase();
  }
}

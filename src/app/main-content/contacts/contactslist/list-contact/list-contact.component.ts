import { Component, Input } from '@angular/core';
import { Contact } from '../../../../shared/interfaces/contact';
import { ContactsService } from '../../../../shared/services/firebase/contacts.service';


@Component({
  selector: 'app-list-contact',
  standalone: true,
  imports: [],
  templateUrl: './list-contact.component.html',
  styleUrl: './list-contact.component.scss'
})
export class ListContactComponent {
  @Input("contact") contact: Contact = {
    id: "",
    firstName: "",
    lastName: "",
    nameShortcut: "",
    nameShortcutColorCode: 0,
    email: "",
    phone: "",
    img: ""
  };

  constructor(private contactService: ContactsService) {
  }

  setCurrentlySelectedContact(contact: Contact) {
    this.contactService.setCurrentlySelectedContact(contact); 
  }
}

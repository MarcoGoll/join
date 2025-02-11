import { Component } from '@angular/core';
import { Contact } from '../../../shared/interfaces/contact';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';
import { ListContactComponent } from "./list-contact/list-contact.component";


@Component({
  selector: 'app-contactslist',
  standalone: true,
  imports: [ListContactComponent],
  templateUrl: './contactslist.component.html',
  styleUrl: './contactslist.component.scss'
})
export class ContactslistComponent {

  contactList: Contact[] = [];

  constructor(private contactService: ContactsService) {
    this.contactList = contactService.contacts;
    console.log(this.contactList);
  }
}

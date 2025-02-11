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

  contactList: Contact[] = [];

  constructor(private contactService: ContactsService) {
    // TODO: initial leer, weil es ein bisschen dauert bis die contactListe die Daten aus der DB bekommt
    this.contactList = contactService.contacts;
    console.log("contactlist vor Timeout 1000: ", this.contactList);

    //TODO:Notlösung mit Timeout => gibt es was besseres?
    setTimeout(() => {
      this.contactList = contactService.contacts;
      console.log("contactlist nach Timeout 1000: ", this.contactList);
    }, 1000)
  }
}

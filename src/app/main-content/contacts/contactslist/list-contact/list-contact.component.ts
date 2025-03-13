import { Component, Input } from '@angular/core';
import { Contact } from '../../../../shared/interfaces/contact';
import { ContactsService } from '../../../../shared/services/firebase/contacts.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss', 'list-contact.resonsive.scss']
})
export class ListContactComponent {
  @Input("isMobileView") isMobileView: boolean = false;
  @Input("contact") contact: Contact = {
    id: "",
    firstName: "",
    lastName: "",
    fullName: "",
    nameShortcut: "",
    nameShortcutColorCode: 0,
    email: "",
    phone: "",
    img: ""
  };

  /**
   * Konstruktor für die Klasse, der den ContactService injiziert.
   * Dient zur Bereitstellung des ContactService für die Klasse.
   * 
   * @param contactService - Eine Instanz des ContactService, die für die Klasse verfügbar gemacht wird.
  */
  constructor(public contactService: ContactsService) {}
}

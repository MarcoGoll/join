import { Component, Input } from '@angular/core';
import { Contact } from '../../../../shared/interfaces/contact';
import { ContactsService } from '../../../../shared/services/firebase/contacts.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-contact.component.html',
  styleUrl: './list-contact.component.scss'
})
export class ListContactComponent {
  @Input("isMobileView") isMobileView: boolean = false;
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

  constructor(public contactService: ContactsService) {
  }
}

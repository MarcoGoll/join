import { Component, Input } from '@angular/core';
import { Contact } from '../../../../shared/interfaces/contact';


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
    email: "",
    phone: "",
    img: ""
  };
}

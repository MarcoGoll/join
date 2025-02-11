import { Component } from '@angular/core';
import { ContactslistComponent } from './contactslist/contactslist.component';
import { ContactsdetailsComponent } from './contactsdetails/contactsdetails.component';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactslistComponent, ContactsdetailsComponent, HeaderComponent, NavbarComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

}

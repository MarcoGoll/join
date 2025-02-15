import { Component } from '@angular/core';
import { ContactslistComponent } from './contactslist/contactslist.component';
import { ContactsdetailsComponent } from './contactsdetails/contactsdetails.component';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { AddcontactComponent } from './addcontact/addcontact.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactslistComponent, ContactsdetailsComponent, HeaderComponent, NavbarComponent, AddcontactComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss', './contacts.responsive.scss']
})
export class ContactsComponent {

}

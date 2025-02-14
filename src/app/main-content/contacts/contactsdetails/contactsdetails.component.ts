import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';
import { Contact } from '../../../shared/interfaces/contact';

@Component({
  selector: 'app-contactsdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactsdetails.component.html',
  styleUrl: './contactsdetails.component.scss'
})
export class ContactsdetailsComponent {



  constructor(public contactService: ContactsService) {

  }

  
}



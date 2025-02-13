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


  selectedContent: any = true;
  

  constructor(public contactService: ContactsService) {

    }

    useEmail(){
      this.contactService.currentlySelectedContact.email
    }

    useFirstName(){
      this.contactService.currentlySelectedContact.firstName
    }

    useLastName(){
      this.contactService.currentlySelectedContact.lastName
    }

    usePhoneNumber(){
      this.contactService.currentlySelectedContact.phone
    }

    useAvatar(){
      this.contactService.currentlySelectedContact.nameShortcut
    } 
}



import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';
import { Contact } from '../../../shared/interfaces/contact';

@Component({
  selector: 'app-editcontact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editcontact.component.html',
  styleUrl: './editcontact.component.scss'
})
export class EditcontactComponent {



  @Input("isMobileView") isMobileView: boolean = false;


  constructor(public contactService: ContactsService) { }

  show() {
    // this.isVisible = true;
    this.contactService.isAddContactViewed = true;
  }

  close() {
    // this.isVisible = false;
    this.contactService.isEditContactViewed = false;
  }

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.close();
    }
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {

      let updatedContact: Contact = {
        "id": this.contactService.currentlySelectedContact.id,
        "firstName": this.contactService.currentlySelectedContact.firstName,
        "lastName": this.contactService.currentlySelectedContact.lastName,
        "fullName": this.contactService.currentlySelectedContact.fullName,
        "nameShortcut": this.contactService.getNameShortcut(this.contactService.currentlySelectedContact.firstName, this.contactService.currentlySelectedContact.lastName),
        "nameShortcutColorCode": this.contactService.getNextColorCode(),
        "email": this.contactService.currentlySelectedContact.email,
        "phone": this.contactService.currentlySelectedContact.phone,
        "img": ""
      }



      this.contactService.updateContact(updatedContact);
      this.close();
    }
  }
}


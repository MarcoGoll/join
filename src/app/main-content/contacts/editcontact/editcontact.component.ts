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
  styleUrls: ['./editcontact.component.scss', './editcontact.responsive.scss']
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
      let newFirstName: string = "";
      let newLastName: string = "";
      let newNameAsArray: string[] = ngForm.value.name.split(" ");
      if (newNameAsArray.length == 2) {
        newFirstName = newNameAsArray[0];
        newLastName = newNameAsArray[1];
      } else {
        newFirstName = ngForm.value.name;
      }

      let updatedContact: Contact = {
        "id": this.contactService.currentContactToBeUpdated.id,
        "firstName": newFirstName,
        "lastName": newLastName,
        "fullName": ngForm.value.name,
        "nameShortcut": this.contactService.getNameShortcut(newFirstName, newLastName),
        "nameShortcutColorCode": this.contactService.currentContactToBeUpdated.nameShortcutColorCode,
        "email": ngForm.value.email,
        "phone": ngForm.value.phone,
        "img": ""
      }
      this.contactService.updateContact(updatedContact);
      this.contactService.setCurrentContacts(updatedContact);
      this.close();
    }
  }
}


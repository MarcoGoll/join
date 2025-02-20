import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';
import { Contact } from '../../../shared/interfaces/contact';

@Component({
  selector: 'app-addcontact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.scss', 'addcontact.responsive.scss']
})
export class AddcontactComponent implements OnInit {

  // isVisible = false;
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, public contactService: ContactsService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{3,}.*$")]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9 ]{7,15}$/)]]
    });

  }

  show() {
    // this.isVisible = true;
    this.contactService.isAddContactViewed = true;
  }

  close() {
    // this.isVisible = false;
    this.contactService.isAddContactViewed = false;
    this.contactForm.reset()
  }

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.close();
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      let nameArray: string[] = this.contactForm.value.name.split(" ");
      let firstName: string = "";
      let lastName: string = "";

      if (nameArray.length == 2) {
        firstName = nameArray[0];
        lastName = nameArray[1];
      } else {
        firstName = this.contactForm.value.name;
        lastName = "";
      }

      let newContact: Contact = {
        "firstName": firstName,
        "lastName": lastName,
        "fullName": firstName + " " + lastName,
        "nameShortcut": this.contactService.getNameShortcut(firstName, lastName),
        "nameShortcutColorCode": this.contactService.getNextColorCode(),
        "email": this.contactForm.value.email,
        "phone": this.contactForm.value.phone,
        "img": ""
      }
      this.contactService.addContact(newContact);
      this.contactForm.reset();
      this.close();
    } else {
      this.contactForm.markAllAsTouched();
      return;
    }
  }
}

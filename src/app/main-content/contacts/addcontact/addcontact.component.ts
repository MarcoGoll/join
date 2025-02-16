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
  styleUrl: './addcontact.component.scss'
})
export class AddcontactComponent implements OnInit {

  // isVisible = false;
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, public contactService: ContactsService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  show() {
    // this.isVisible = true;
    this.contactService.isAddContactViewed = true;
  }

  close() {
    // this.isVisible = false;
    this.contactService.isAddContactViewed = false;
  }

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.close();
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // we can send the Form Information from here to Server :)
      let nameArray: string[] = this.contactForm.value.name.split(" ");
      let firstName: string = nameArray[0];
      let lastName: string = nameArray[1];

      let newContact: Contact = {
        "firstName": firstName,
        "lastName": lastName,
        "nameShortcut": this.contactService.getNameShortcut(firstName, lastName),
        "nameShortcutColorCode": this.contactService.getNextColorCode(),
        "email": this.contactForm.value.email,
        "phone": this.contactForm.value.phone,
        "img": ""
      }
      this.contactService.addContact(newContact);
      this.contactForm.reset();
      this.close();
    }
  }
}

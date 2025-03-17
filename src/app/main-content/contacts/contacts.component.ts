import { Component, HostListener } from '@angular/core';
import { ContactslistComponent } from './contactslist/contactslist.component';
import { ContactsdetailsComponent } from './contactsdetails/contactsdetails.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../shared/services/firebase/contacts.service';
import { EditcontactComponent } from './editcontact/editcontact.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    ContactslistComponent,
    ContactsdetailsComponent,
    AddcontactComponent,
    CommonModule,
    EditcontactComponent,
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss', './contacts.responsive.scss'],
})
export class ContactsComponent {
  isMobileView = false;

  constructor(public contactService: ContactsService) {}

  /**
   * Called when the component is initialized.
   * Sets the view to mobile or desktop based on the window width.
   */
  ngOnInit(): void {
    if (window.innerWidth <= 1023) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
  }

  /**
   * Triggered when the window is resized.
   * Updates the view mode (mobile or desktop) based on the window width.
   */
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth <= 1023) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
  }
}

import { Component, HostListener } from '@angular/core';
import { ContactslistComponent } from './contactslist/contactslist.component';
import { ContactsdetailsComponent } from './contactsdetails/contactsdetails.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../shared/services/firebase/contacts.service';
import { EditcontactComponent } from "./editcontact/editcontact.component";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    ContactslistComponent,
    ContactsdetailsComponent,
    AddcontactComponent,
    CommonModule,
    EditcontactComponent
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss', './contacts.responsive.scss']
})
export class ContactsComponent {

  isMobileView = false;

  constructor(public contactService: ContactsService) {
  }

  /**
   * Wird beim Initialisieren der Komponente aufgerufen.
   * Setzt die Ansicht basierend auf der Fensterbreite auf Mobil- oder Desktopansicht.
   */
  ngOnInit(): void {
    if (window.innerWidth <= 1023) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
  }

  /**
   * Wird ausgelöst, wenn das Fenster in der Größe verändert wird.
   * Aktualisiert den Ansichtsmodus (mobil oder Desktop) basierend auf der Fensterbreite.
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

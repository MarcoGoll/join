import { Component, Input } from '@angular/core';
import { Contact } from '../../../shared/interfaces/contact';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';
import { ListContactComponent } from "./list-contact/list-contact.component";
import { timeout } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contactslist',
  standalone: true,
  imports: [ListContactComponent, CommonModule],
  templateUrl: './contactslist.component.html',
  styleUrls: ['./contactslist.component.scss', './contactslist.responsive.scss']
})
export class ContactslistComponent {
  @Input("isMobileView") isMobileView: boolean = false;

  testContact: Contact = {
    firstName: "test_firstName",
    lastName: "test_lastName",
    fullName: "test_fullName",
    nameShortcut: "TT",
    nameShortcutColorCode: 1,
    email: "test@email.de",
    phone: "123456789",
    img: ""
  }

  /**
   * Konstruktor der Klasse, der den ContactService injiziert.
   * @param contactService - Der Service, der Kontaktoperationen verwaltet.
   */
  constructor(public contactService: ContactsService) { }

  /**
   * Fügt einen neuen Kontakt hinzu.
   * @param contact - Der Kontakt, der hinzugefügt werden soll.
   */
  addContact(contact: Contact) {
    this.contactService.addContact(contact);
  }

  /**
   * Löscht einen bestehenden Kontakt.
   * @param contact - Der Kontakt, der gelöscht werden soll.
   */
  deleteContact(contact: Contact) {
    this.contactService.deleteContact(contact);
  }

  /**
   * Setzt die Datenbank zurück.
   * Löscht alle gespeicherten Kontakte.
   */
  resetDatabase() {
    this.contactService.resetDatabase();
  }

  /**
   * Zeigt das Formular zum Hinzufügen eines neuen Kontakts an.
   */
  showAddContact() {
    this.contactService.isAddContactViewed = true;
  }
}

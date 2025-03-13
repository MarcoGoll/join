import { CommonModule } from '@angular/common';
import { Component, Input, isDevMode } from '@angular/core';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';

@Component({
  selector: 'app-contactsdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactsdetails.component.html',
  styleUrls: ['./contactsdetails.component.scss', './contactsdetails.responsive.scss']
})
export class ContactsdetailsComponent {
  @Input("isMobileView") isMobileView: boolean = false;
  isMoreControlOverviewShown: boolean = false
  isInitialLoad: boolean = true;

  /**
   * Konstruktor, der den ContactsService initialisiert.
   * @param contactService Der Service zur Verwaltung von Kontakten.
   */
  constructor(public contactService: ContactsService) { }

  /**
   * Schaltet die Anzeige von mehr Steuerungsoptionen um.
   * Setzt auch den Initialisierungsstatus auf false.
   */
  toggleMoreControlOverview() {
    this.isMoreControlOverviewShown = !this.isMoreControlOverviewShown;
    this.isInitialLoad = false;
  }

  /**
   * Setzt die Initialwerte zurück.
   * Setzt den Initialisierungsstatus und blendet die erweiterten Steuerungen aus.
   */
  setInitialValues() {
    this.isInitialLoad = true;
    this.isMoreControlOverviewShown = false;
  }

  /**
   * Setzt die Bearbeitung des Kontakts auf "sichtbar".
   * Ändert den Zustand des Services, dass der Bearbeitungsmodus aktiv ist.
   */
  showEditContact() {
    this.contactService.isEditContactViewed = true;
  }
}



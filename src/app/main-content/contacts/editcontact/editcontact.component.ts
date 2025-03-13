import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  /**
   * Konstruktor der Klasse, der den ContactService injiziert.
   * @param contactService Der Service, der die Kontaktlogik enthält.
   */
  constructor(public contactService: ContactsService) { }

  /**
   * Zeigt das Hinzufügen-Kontakt-Modal an, indem der Status auf 'true' gesetzt wird.
   */
  show() {
    this.contactService.isAddContactViewed = true; 
  }

  /**
   * Schließt das Bearbeiten-Kontakt-Modal, indem der Status auf 'false' gesetzt wird.
   */
  close() {
    this.contactService.isEditContactViewed = false;
  }

  /**
   * Schließt das Modal, wenn auf den Overlay-Bereich geklickt wird.
   * @param event Das MouseEvent, das den Klick auf den Overlay-Bereich darstellt.
   */
  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.close();
    }
  }

  /**
   * Verarbeitet das Absenden des Formulars und aktualisiert den Kontakt, wenn die Eingaben gültig sind.
   * @param ngForm Das Formular, das die eingegebenen Kontaktinformationen enthält.
   */
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


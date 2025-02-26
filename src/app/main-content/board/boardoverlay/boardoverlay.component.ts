import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TasksService } from '../../../shared/services/firebase/tasks.service';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';
import { Contact } from '../../../shared/interfaces/contact';

@Component({
  selector: 'app-boardoverlay',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boardoverlay.component.html',
  styleUrls: [
    './boardoverlay.component.scss',
    './boardoverlay.responsive.scss',
  ],
})
export class BoardoverlayComponent {
  taskService = inject(TasksService);
  contactService = inject(ContactsService);

  isVisible = true;
  isEditMode = false;
  isAssignedToOpen = false;

  show() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
    this.isEditMode = false;
  }

  closeEdit() {
    this.isEditMode = false;
  }

  openEditModal() {
    this.isEditMode = true;
    this.isVisible = false;
  }

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.close();
    }
  }

  closeEditModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('edit-overlay')) {
      this.closeEdit();
    }
  }

  setPrio(prio: string) {
    switch (prio) {
      case 'Urgent':
        this.taskService.currentTaskToBeUpdated.prio = 'Urgent';
        break;
      case 'Medium':
        this.taskService.currentTaskToBeUpdated.prio = 'Medium';
        break;
      case 'Low':
        this.taskService.currentTaskToBeUpdated.prio = 'Low';
        break;
      default:
        console.log('Identifier is not known');
    }
  }

  toggleIsAssignedToOpen() {
    this.isAssignedToOpen = !this.isAssignedToOpen;
  }

  toggleContactInCurrentSelectedAssignedTo(contact: Contact) {
    if (
      this.contactService
        .getContactsViaIds(this.taskService.currentTaskToBeUpdated.assignedTo)
        .includes(contact)
    ) {
      this.deleteContactFromCurrentSelectedAssignedTo(contact);
    } else {
      this.addContactToCurrentSelectedAssignedTo(contact);
    }
  }

  addContactToCurrentSelectedAssignedTo(contact: Contact) {
    // TODO: ergebnis muss in array gespeichert werden
    this.contactService
      .getContactsViaIds(this.taskService.currentTaskToBeUpdated.assignedTo)
      .push(contact);
  }

  deleteContactFromCurrentSelectedAssignedTo(contact: Contact) {
    const index = this.contactService
      .getContactsViaIds(this.taskService.currentTaskToBeUpdated.assignedTo)
      .indexOf(contact);
    if (index > -1) {
      this.contactService
        .getContactsViaIds(this.taskService.currentTaskToBeUpdated.assignedTo)
        .splice(index, 1);
    }
  }

  isContactCurrentlySelected(contact: Contact) {
    if (
      this.contactService
        .getContactsViaIds(this.taskService.currentTaskToBeUpdated.assignedTo)
        .includes(contact)
    ) {
      return true;
    } else {
      return false;
    }
  }
}

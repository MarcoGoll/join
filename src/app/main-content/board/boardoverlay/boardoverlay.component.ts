import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
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
  currentSelectedAssignedTo: Contact[] = [];

  isVisible = true;
  isEditMode = false;
  isAssignedToOpen = false;

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
    if (contact.id) {
      if (
        this.taskService.currentTaskToBeUpdated.assignedTo.includes(contact.id)
      ) {
        this.deleteContactFromCurrentSelectedAssignedTo(contact.id);
      } else {
        this.addContactToCurrentSelectedAssignedTo(contact.id);
      }
    }
  }

  addContactToCurrentSelectedAssignedTo(id: string) {
    this.taskService.currentTaskToBeUpdated.assignedTo.push(id);
  }

  deleteContactFromCurrentSelectedAssignedTo(id: string) {
    const index =
      this.taskService.currentTaskToBeUpdated.assignedTo.indexOf(id);
    if (index > -1) {
      this.taskService.currentTaskToBeUpdated.assignedTo.splice(index, 1);
    }
  }

  isContactCurrentlySelected(contact: Contact) {
    if (contact.id) {
      if (
        this.taskService.currentTaskToBeUpdated.assignedTo.includes(contact.id)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

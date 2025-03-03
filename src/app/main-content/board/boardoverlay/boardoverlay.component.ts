import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { TasksService } from '../../../shared/services/firebase/tasks.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';
import { Contact } from '../../../shared/interfaces/contact';
import { Subtask } from '../../../shared/interfaces/subtask';
import { Task } from '../../../shared/interfaces/task';

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
  // currentSelectedAssignedTo: Contact[] = [];

  isVisible: boolean = true;
  isEditMode: boolean = false;
  isAssignedToOpen: boolean = false;
  isSubtaskinFocus: boolean = false;
  subtaskValue: string = '';
  // subtasksToAdd: { inEditMode: boolean; description: string }[] = [];

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

  setIsSubtaskinFocus(myBool: boolean) {
    this.isSubtaskinFocus = myBool;
  }

  setSubtaskValue(value: string) {
    this.subtaskValue = value;
  }

  confirmSubtask() {
    if (this.subtaskValue != '') {
      this.taskService.subtasksToAdd.push({
        inEditMode: false,
        checked: false, //TODO: Ein Abgeschlossener Task der bearbeitet wird, wird hier wieder auf unbearbeitet gesetzt.
        description: this.subtaskValue,
      });
      this.setSubtaskValue('');
    }
  }

  deleteSubtask(index: number) {
    this.taskService.subtasksToAdd.splice(index, 1);
  }

  updateFromEditMode(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      console.log('formValide');
      //TODO: Prüfung eventuell früher. Direkt nach oder vor ngForm.form.valid

      let subtasksToUpdate: Subtask[] = [];

      this.taskService.subtasksToAdd.forEach((subtask, index) => {
        subtasksToUpdate.push({
          checked: subtask.checked,
          description: subtask.description,
        });
      });
      let taskToUpdate: Task = {
        id: this.taskService.currentTaskToBeUpdated.id,
        title: this.taskService.currentTaskToBeUpdated.title,
        description: this.taskService.currentTaskToBeUpdated.description,
        assignedTo: this.taskService.currentTaskToBeUpdated.assignedTo,
        status: this.taskService.currentTaskToBeUpdated.status,
        dueDate: this.taskService.currentTaskToBeUpdated.dueDate,
        prio: this.taskService.currentTaskToBeUpdated.prio,
        category: this.taskService.currentTaskToBeUpdated.category,
        subTasks: subtasksToUpdate,
      };
      this.taskService.updateTask(taskToUpdate);
      // this.resetUpdateTaskComponent();
    } else {
      console.log('formInValide');
    }
  }

  updateFromDisplayMode() {
    this.taskService.currentTaskToBeUpdated =
      this.taskService.currentlySelectedTask;
    this.taskService.updateTask(this.taskService.currentlySelectedTask);
  }
}

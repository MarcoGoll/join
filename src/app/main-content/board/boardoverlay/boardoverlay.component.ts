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

  isVisible: boolean = true;
  isEditMode: boolean = false;
  isSubtaskinFocus: boolean = false;
  subtaskValue: string = '';

  /**
   * Sets the priority of the current task.
   * @param {string} prio - The priority as a string ('Urgent', 'Medium', or 'Low').
   */
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
        console.error('Identifier is not known');
    }
  }

  /**
   * Adds or removes a contact to the current task.
   * @param {Contact} contact - The contact to be added or removed.
   */
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

  /**
   * Adds a contact to the list of assigned people.
   * @param {string} id - The ID of the contact.
   */
  addContactToCurrentSelectedAssignedTo(id: string) {
    this.taskService.currentTaskToBeUpdated.assignedTo.push(id);
  }

  /**
   * Removes a contact from the list of assigned people.
   * @param {string} id - The ID of the contact to be removed.
   */
  deleteContactFromCurrentSelectedAssignedTo(id: string) {
    const index =
      this.taskService.currentTaskToBeUpdated.assignedTo.indexOf(id);
    if (index > -1) {
      this.taskService.currentTaskToBeUpdated.assignedTo.splice(index, 1);
    }
  }

  /**
   * Checks if a contact is currently assigned.
   * @param {Contact} contact - The contact to check.
   * @returns {boolean} true if the contact is assigned, otherwise false.
   */
  isContactCurrentlySelected(contact: Contact): boolean {
    if (contact.id) {
      return this.taskService.currentTaskToBeUpdated.assignedTo.includes(
        contact.id
      );
    }
    return false;
  }

  /**
   * Sets the focus status of a subtask.
   * @param {boolean} myBool - The new focus status (true or false).
   */
  setIsSubtaskinFocus(myBool: boolean) {
    this.isSubtaskinFocus = myBool;
  }

  /**
   * Sets the value of a subtask.
   * @param {string} value - The new value of the subtask as a string.
   */
  setSubtaskValue(value: string) {
    this.subtaskValue = value;
  }

  /**
   * Confirms the addition of a subtask if the text value is not empty.
   * Adds the subtask to the list and resets the input field.
   */
  confirmSubtask(): void {
    if (this.subtaskValue != '') {
      this.taskService.subtasksToAdd.push({
        inEditMode: false,
        checked: false,
        description: this.subtaskValue,
      });
      this.setSubtaskValue('');
    }
  }

  /**
   * Deletes a subtask from the list of subtasks to be added.
   * Removes the element at the specified index position.
   *
   * @param {number} index - The index of the subtask to be deleted.
   */
  deleteSubtask(index: number) {
    this.taskService.subtasksToAdd.splice(index, 1);
  }

  /**
   * Updates the current task with data from the form if it is valid and submitted.
   * Collects subtasks to update and creates a new task object, which is passed to the task service for updating.
   *
   * @param ngForm The Angular form containing the task data.
   */
  updateFromEditMode(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
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
    } else {
    }
  }

  /**
   * Updates the current task based on the displayed mode.
   * Sets the task for update and calls the update method.
   */
  updateFromDisplayMode() {
    this.taskService.currentTaskToBeUpdated =
      this.taskService.currentlySelectedTask;
    this.taskService.updateTask(this.taskService.currentlySelectedTask);
  }
}

import { Component, inject, Input, OnInit } from '@angular/core';
import { TasksService } from '../../shared/services/firebase/tasks.service';
import { Task } from '../../shared/interfaces/task';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../shared/services/firebase/contacts.service';
import { Contact } from '../../shared/interfaces/contact';
import { Subtask } from '../../shared/interfaces/subtask';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss', './add-task.responsive.scss'],
})
export class AddTaskComponent implements OnInit {
  taskService = inject(TasksService);
  contactService = inject(ContactsService);
  @Input('overlayMode') overlayMode: boolean = false;
  isAssignedToOpen = false;
  isCategoryOpen = false;
  isSubtaskinFocus = false;
  displayConfirmation = false;
  categoryValue: string = 'Select task category';
  showErrorCategory: boolean = false;
  subtaskValue: string = '';
  subtasksToAdd: { inEditMode: boolean; description: string }[] = [];
  newTask: Task = {
    title: '',
    description: '',
    assignedTo: [],
    status: 'toDo',
    dueDate: '',
    prio: 'Medium',
    category: 'User Story',
    subTasks: [],
  };
  currentPrioSelection: string = 'Medium';
  currentSelectedAssignedTo: Contact[] = [];
  today: string = '';

  /**
   * Initializes a new instance of the class and injects the Router service.
   *
   * @param {Router} router - The Angular Router service used for navigating between views.
   */
  constructor(private router: Router) {}

  /**
   * Lifecycle hook that is called after Angular has initialized the component's input properties.
   * This function sets the `today` property to the current date in the format 'YYYY-MM-DD'.
   */
  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }

  /**
   * Sets the priority level based on the provided string.
   * This function updates the `currentPrioSelection` property to reflect the chosen priority.
   *
   * @param {string} prio - The priority to set. It can be one of: 'Urgent', 'Medium', or 'Low'.
   */
  setPrio(prio: string) {
    switch (prio) {
      case 'Urgent':
        this.currentPrioSelection = 'Urgent';
        break;
      case 'Medium':
        this.currentPrioSelection = 'Medium';
        break;
      case 'Low':
        this.currentPrioSelection = 'Low';
        break;
      default:
        console.error('Identifier is not known');
    }
  }

  /**
   * Sets the value for the subtask.
   *
   * @param {string} value - The value to set for the subtask.
   */
  setSubtaskValue(value: string) {
    this.subtaskValue = value;
  }

  /**
   * Confirms the addition of a new subtask.
   */
  confirmSubtask() {
    if (this.subtaskValue != '') {
      this.subtasksToAdd.push({
        inEditMode: false,
        description: this.subtaskValue,
      });
      this.setSubtaskValue('');
    }
  }

  /**
   * Deletes a subtask from the `subtasksToAdd` array based on the provided index.
   *
   * @param {number} index - The index of the subtask to delete.
   */
  deleteSubtask(index: number) {
    this.subtasksToAdd.splice(index, 1);
  }

  /**
   * Toggles the visibility of the "Assigned To" list.
   */
  toggleIsAssignedToOpen() {
    this.isAssignedToOpen = !this.isAssignedToOpen;
  }

  /**
   * Toggles the visibility of the "Category" list.
   */
  toggleIsCategoryOpen() {
    this.isCategoryOpen = !this.isCategoryOpen;
  }

  /**
   * Sets the focus state for a subtask.
   *
   * @param {boolean} myBool - The boolean value to set for the `isSubtaskinFocus` property.
   */
  setIsSubtaskinFocus(myBool: boolean) {
    this.isSubtaskinFocus = myBool;
  }

  /**
   * Stops the propagation of the event to parent elements.
   *
   * @param {Event} event - The event whose propagation should be stopped.
   */
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  /**
   * Toggles the presence of a contact in the `currentSelectedAssignedTo` array.
   *
   * @param {Contact} contact - The contact to toggle in the `currentSelectedAssignedTo` array.
   */
  toggleContactInCurrentSelectedAssignedTo(contact: Contact) {
    if (this.currentSelectedAssignedTo.includes(contact)) {
      this.deleteContactFromCurrentSelectedAssignedTo(contact);
    } else {
      this.addContactToCurrentSelectedAssignedTo(contact);
    }
  }

  /**
   * Adds a contact to the `currentSelectedAssignedTo` array.
   *
   * @param {Contact} contact - The contact to add to the `currentSelectedAssignedTo` array.
   */
  addContactToCurrentSelectedAssignedTo(contact: Contact) {
    this.currentSelectedAssignedTo.push(contact);
  }

  /**
   * Deletes a contact from the `currentSelectedAssignedTo` array.
   *
   * @param {Contact} contact - The contact to remove from the `currentSelectedAssignedTo` array.
   */
  deleteContactFromCurrentSelectedAssignedTo(contact: Contact) {
    const index = this.currentSelectedAssignedTo.indexOf(contact);
    if (index > -1) {
      this.currentSelectedAssignedTo.splice(index, 1);
    }
  }

  /**
   * Checks if a contact is currently selected in the `currentSelectedAssignedTo` array.
   *
   * @param {Contact} contact - The contact to check if it is currently selected.
   * @returns {boolean} `true` if the contact is selected, otherwise `false`.
   */
  isContactCurrentlySelected(contact: Contact) {
    if (this.currentSelectedAssignedTo.includes(contact)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Sets the category value and closes the category selection.
   *
   * @param {string} category - The category to set as the current selected category.
   */
  setCategory(category: string) {
    this.isCategoryOpen = false;
    this.categoryValue = category;
  }

  /**
   * Handles the form submission and task creation process.
   *
   * @param {NgForm} ngForm - The form object that contains the task data to be submitted.
   */
  onSubmit(ngForm: NgForm) {
    if (
      ngForm.submitted &&
      ngForm.form.valid &&
      (this.categoryValue == 'Technical Task' ||
        this.categoryValue == 'User Story')
    ) {
      this.showErrorCategory = false;
      if (
        this.currentPrioSelection == 'Urgent' ||
        this.currentPrioSelection == 'Medium' ||
        this.currentPrioSelection == 'Low'
      ) {
        let assignedToIds: string[] = [];
        let subtasksToCreate: Subtask[] = [];

        this.currentSelectedAssignedTo.forEach((assignee) => {
          if (assignee.id) {
            assignedToIds.push(assignee.id);
          }
        });
        this.subtasksToAdd.forEach((subtask) => {
          subtasksToCreate.push({
            checked: false,
            description: subtask.description,
          });
        });
        let taskToCreate: Task = {
          title: this.newTask.title,
          description: this.newTask.description,
          assignedTo: assignedToIds,
          status: this.taskService.statusToBeUsed,
          dueDate: this.newTask.dueDate,
          prio: this.currentPrioSelection,
          category: this.categoryValue,
          subTasks: subtasksToCreate,
        };
        this.taskService.addTask(taskToCreate);
        ngForm.resetForm();
        this.resetAddTaskComponent();
        this.displayConfirmation = true;
        setTimeout(() => {
          if (this.overlayMode) {
            this.taskService.toggleIsAddTaskOverlayDisplayed();
            this.displayConfirmation = false;
          } else {
            this.router.navigate(['/board']);
          }
        }, 1025);
      }
    } else {
      ngForm.form.markAllAsTouched();
      if (
        this.categoryValue == 'Technical Task' ||
        this.categoryValue == 'User Story'
      ) {
        this.showErrorCategory = false;
      } else {
        this.showErrorCategory = true;
      }
    }
  }

  /**
   * Resets the task variables to their initial values.
   */
  resetAddTaskComponent() {
    this.setPrio('Medium');
    this.categoryValue = 'Select task category';
    this.subtasksToAdd = [];
    this.currentSelectedAssignedTo = [];
    this.isAssignedToOpen = false;
    this.isCategoryOpen = false;
    this.showErrorCategory = false;
    this.isSubtaskinFocus = false;
    this.displayConfirmation = false;
  }

  /**
   * Resets the provided form to its initial state.
   *
   * @param {NgForm} ngForm - The form object to reset.
   */
  myResetForm(ngForm: NgForm) {
    ngForm.resetForm();
  }
}

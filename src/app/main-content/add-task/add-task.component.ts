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

  constructor(private router: Router) {}

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }

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

  setSubtaskValue(value: string) {
    this.subtaskValue = value;
  }

  confirmSubtask() {
    if (this.subtaskValue != '') {
      this.subtasksToAdd.push({
        inEditMode: false,
        description: this.subtaskValue,
      });
      this.setSubtaskValue('');
    }
  }

  deleteSubtask(index: number) {
    this.subtasksToAdd.splice(index, 1);
  }

  toggleIsAssignedToOpen() {
    this.isAssignedToOpen = !this.isAssignedToOpen;
  }

  toggleIsCategoryOpen() {
    this.isCategoryOpen = !this.isCategoryOpen;
  }

  setIsSubtaskinFocus(myBool: boolean) {
    this.isSubtaskinFocus = myBool;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  toggleContactInCurrentSelectedAssignedTo(contact: Contact) {
    if (this.currentSelectedAssignedTo.includes(contact)) {
      this.deleteContactFromCurrentSelectedAssignedTo(contact);
    } else {
      this.addContactToCurrentSelectedAssignedTo(contact);
    }
  }

  addContactToCurrentSelectedAssignedTo(contact: Contact) {
    this.currentSelectedAssignedTo.push(contact);
  }

  deleteContactFromCurrentSelectedAssignedTo(contact: Contact) {
    const index = this.currentSelectedAssignedTo.indexOf(contact);
    if (index > -1) {
      this.currentSelectedAssignedTo.splice(index, 1);
    }
  }

  isContactCurrentlySelected(contact: Contact) {
    if (this.currentSelectedAssignedTo.includes(contact)) {
      return true;
    } else {
      return false;
    }
  }

  setContact(category: string) {
    this.isCategoryOpen = false;
    this.categoryValue = category;
  }

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

  myResetForm(ngForm: NgForm) {
    ngForm.resetForm();
  }
}

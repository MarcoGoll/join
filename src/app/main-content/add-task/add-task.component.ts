import { Component, inject, Input } from '@angular/core';
import { TasksService } from '../../shared/services/firebase/tasks.service';
import { Task } from '../../shared/interfaces/task';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../shared/services/firebase/contacts.service';
import { Contact } from '../../shared/interfaces/contact';
import { Subtask } from '../../shared/interfaces/subtask';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss', './add-task.responsive.scss'],
})
export class AddTaskComponent {
  taskService = inject(TasksService);
  contactService = inject(ContactsService);
  @Input('overlayMode') overlayMode: boolean = false;

  isAssignedToOpen = false;
  isCategoryOpen = false;
  isSubtaskinFocus = false;
  categoryValue: string = 'Select task category';
  subtaskValue: string = '';
  subtasksToAdd: { inEditMode: boolean; description: string }[] = [];

  newTask: Task = {
    title: '',
    description: '',
    assignedTo: [],
    status: 'toDo',
    dueDate: 'yyyy-mm-dd',
    prio: 'Medium',
    category: 'User Story',
    subTasks: [],
  };

  currentPrioSelection: string = 'Medium';
  currentSelectedAssignedTo: Contact[] = [];

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
        console.log('Identifier is not known');
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
    if (ngForm.submitted && ngForm.form.valid) {
      console.log('formValide');
      if (
        this.categoryValue == 'Technical Task' ||
        this.categoryValue == 'User Story'
      ) {
        //TODO: Prüfung eventuell früher. Direkt nach oder vor ngForm.form.valid
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
          this.subtasksToAdd.forEach((subtask, index) => {
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
        }
      }
    } else {
      console.log('formInValide');
    }
  }

  resetAddTaskComponent() {
    this.setPrio('Medium');
    this.categoryValue = 'Select task category';
    this.subtasksToAdd = [];
    this.currentSelectedAssignedTo = [];
    this.isAssignedToOpen = false;
    this.isCategoryOpen = false;
    this.isSubtaskinFocus = false;
  }

  myResetForm(ngForm: NgForm) {
    ngForm.resetForm();
  }
}

import { Component, inject } from '@angular/core';
import { TasksService } from '../../shared/services/firebase/tasks.service';
import { Task } from '../../shared/interfaces/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../shared/services/firebase/contacts.service';
import { Contact } from '../../shared/interfaces/contact';


@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss', './add-task.responsive.scss']
})
export class AddTaskComponent {

  taskService = inject(TasksService);
  contactService = inject(ContactsService);


  isAssignedToOpen = false;
  isCategoryOpen = false;
  isSubtaskinFocus = false;
  categoryValue: string = "Select task category";

  newTask: Task = {
    "title": "",
    "description": "",
    "assignedTo": [],
    "status": "toDo",
    "dueDate": "yyyy-mm-dd",
    "prio": "Medium",
    "category": "User Story",
    "subTasks": [],
  }

  currentPrioSelection: string = "medium";
  currentSelectedAssignedTo: Contact[] = [];

  setPrio(prio: string) {
    switch (prio) {
      case "urgent":
        this.currentPrioSelection = "urgent";
        break;
      case "medium":
        this.currentPrioSelection = "medium";
        break;
      case "low":
        this.currentPrioSelection = "low";
        break;
      default:
        console.log("Identifier is not known");
    }
  }

  toggleIsAssignedToOpen() {
    this.isAssignedToOpen = !this.isAssignedToOpen;
  }

  toggleIsCategoryOpen() {
    this.isCategoryOpen = !this.isCategoryOpen;
  }

  setIsSubtaskinFocus(myBool: boolean) {
    this.isSubtaskinFocus = myBool;
    console.log("this.isSubtaskinFocus: ", this.isSubtaskinFocus)
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  toggleContactInCurrentSelectedAssignedTo(contact: Contact) {
    if (this.currentSelectedAssignedTo.includes(contact)) {
      this.deleteContactFromCurrentSelectedAssignedTo(contact);
      console.log("List after delete: ", this.currentSelectedAssignedTo);
    } else {
      this.addContactToCurrentSelectedAssignedTo(contact);
      console.log("List after add: ", this.currentSelectedAssignedTo);
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

}


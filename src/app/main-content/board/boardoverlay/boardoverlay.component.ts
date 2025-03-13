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
   * Setzt die Priorität der aktuellen Aufgabe.
   * @param prio - Die Priorität als String ('Urgent', 'Medium' oder 'Low').
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
   * Fügt einen Kontakt zur aktuellen Aufgabe hinzu oder entfernt ihn.
   * @param contact - Der Kontakt, der hinzugefügt oder entfernt werden soll.
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
   * Fügt einen Kontakt zur Liste der zugewiesenen Personen hinzu.
   * @param id - Die ID des Kontakts.
   */
  addContactToCurrentSelectedAssignedTo(id: string) {
    this.taskService.currentTaskToBeUpdated.assignedTo.push(id);
  }

  /**
   * Entfernt einen Kontakt aus der Liste der zugewiesenen Personen.
   * @param id - Die ID des zu entfernenden Kontakts.
   */
  deleteContactFromCurrentSelectedAssignedTo(id: string) {
    const index =
      this.taskService.currentTaskToBeUpdated.assignedTo.indexOf(id);
    if (index > -1) {
      this.taskService.currentTaskToBeUpdated.assignedTo.splice(index, 1);
    }
  }

  /**
   * Prüft, ob ein Kontakt derzeit zugewiesen ist.
   * @param contact - Der zu prüfende Kontakt.
   * @returns true, wenn der Kontakt zugewiesen ist, sonst false.
   */
  isContactCurrentlySelected(contact: Contact): boolean {
    if (contact.id) {
      return this.taskService.currentTaskToBeUpdated.assignedTo.includes(contact.id);
    }
    return false;
  }

  /**
   * Setzt den Fokusstatus einer Unteraufgabe.
   * @param myBool - Der neue Fokusstatus (true oder false).
   */
  setIsSubtaskinFocus(myBool: boolean) {
    this.isSubtaskinFocus = myBool;
  }

  /**
   * Setzt den Wert einer Unteraufgabe.
   * @param value - Der neue Wert der Unteraufgabe als String.
   */
  setSubtaskValue(value: string) {
    this.subtaskValue = value;
  }

  /**
   * Bestätigt das Hinzufügen einer Unteraufgabe, wenn der Textwert nicht leer ist.
   * Fügt die Unteraufgabe der Liste hinzu und setzt das Eingabefeld zurück.
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
   * Löscht eine Unteraufgabe aus der Liste der hinzuzufügenden Unteraufgaben.
   * Entfernt das Element an der angegebenen Indexposition.
   * 
   * @param index - Der Index der zu löschenden Unteraufgabe.
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
   * Aktualisiert die aktuelle Aufgabe basierend auf dem angezeigten Modus.
   * Setzt die Aufgabe zur Aktualisierung und ruft die Update-Methode auf.
   */
  updateFromDisplayMode() {
    this.taskService.currentTaskToBeUpdated =
      this.taskService.currentlySelectedTask;
    this.taskService.updateTask(this.taskService.currentlySelectedTask);
  }
}

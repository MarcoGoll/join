import { Component, inject, Input } from '@angular/core';
import { Task } from '../../../shared/interfaces/task';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../../shared/services/firebase/tasks.service';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';

@Component({
  selector: 'app-single-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss', './single-card.responsive.scss'],
})
export class SingleCardComponent {
  taskService = inject(TasksService);
  contactService = inject(ContactsService);

  @Input('task') task: Task = {
    title: '',
    description: '',
    assignedTo: [],
    status: 'toDo',
    dueDate: '',
    prio: 'Urgent',
    category: 'User Story',
    subTasks: [],
  };

  /**
   * Counts all completed (checked) subtasks of a task.
   * Returns the number of checked subtasks.
   *
   * @param {Task} task - The task whose subtasks are to be checked.
   * @returns {number} The number of checked subtasks.
   */
  getAllDoneSubTasks(task: Task) {
    let counter = 0;
    for (let i = 0; i < task.subTasks.length; i++) {
      if (task.subTasks[i].checked == true) {
        counter++;
      }
    }
    return counter;
  }

  /**
   * Calculates the progress of a task based on its subtasks.
   * Returns the progress as a percentage in the format "X%".
   *
   * @param {Task} task - The task for which the progress is to be calculated.
   * @returns {string} The progress of the task as a percentage (e.g., "50%").
   */
  getProgress(task: Task): string {
    if (!task.subTasks || task.subTasks.length === 0) return '0%';
    return (this.getAllDoneSubTasks(task) / task.subTasks.length) * 100 + '%';
  }
}

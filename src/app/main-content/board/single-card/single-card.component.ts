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
  styleUrls: ['./single-card.component.scss', './single-card.responsive.scss']
})
export class SingleCardComponent {
  
 

  taskService = inject(TasksService);
  contactService = inject(ContactsService);

  @Input("task") task: Task = {
    "title": "",
    "description": "",
    "assignedTo": [],
    "status": 'toDo',
    "dueDate": "",
    "prio": 'Urgent',
    "category": 'User Story',
    "subTasks": []
  }

  getAllDoneSubTasks(task: Task) {
    let counter = 0;
    for (let i = 0; i < task.subTasks.length; i++) {
      if (task.subTasks[i].checked == true) {
        counter++;
      }
    }

    return counter;
  }

  getProgress(task: Task): string {
    if (!task.subTasks || task.subTasks.length === 0) return "0%";
    return (this.getAllDoneSubTasks(task) / task.subTasks.length) * 100 + "%";
  }
} 

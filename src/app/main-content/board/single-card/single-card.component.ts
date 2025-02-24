import { Component, inject, Input } from '@angular/core';
import { Task } from '../../../shared/interfaces/task';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../../shared/services/firebase/tasks.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-single-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss', './single-card.responsive.scss']
})
export class SingleCardComponent {

  taskService = inject(TasksService);

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
} 

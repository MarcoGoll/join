import { Component, Input } from '@angular/core';
import { Task } from '../../../shared/interfaces/task';

@Component({
  selector: 'app-single-card',
  standalone: true,
  imports: [],
  templateUrl: './single-card.component.html',
  styleUrl: './single-card.component.scss'
})
export class SingleCardComponent {
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

import { Component, inject } from '@angular/core';
import { TasksService } from '../../shared/services/firebase/tasks.service';
import { Task } from '../../shared/interfaces/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss', './add-task.responsive.scss']
})
export class AddTaskComponent {

  taskService = inject(TasksService);

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

}

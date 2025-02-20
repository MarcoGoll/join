import { Component, inject } from '@angular/core';
import { TasksService } from '../../shared/services/firebase/tasks.service';
import { Task } from '../../shared/interfaces/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
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
}

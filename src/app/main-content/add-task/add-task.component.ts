import { Component, inject } from '@angular/core';
import { TasksService } from '../../shared/services/firebase/tasks.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  taskService = inject(TasksService);

}

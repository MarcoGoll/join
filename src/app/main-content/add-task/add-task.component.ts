import { Component, inject } from '@angular/core';
import { TasksService } from '../../shared/services/firebase/tasks.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss', './add-task.responsive.scss']
})
export class AddTaskComponent {

  taskService = inject(TasksService);

}

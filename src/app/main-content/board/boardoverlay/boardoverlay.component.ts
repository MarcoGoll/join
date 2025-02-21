
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TasksService } from '../../../shared/services/firebase/tasks.service';

@Component({
  selector: 'app-boardoverlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boardoverlay.component.html',
  styleUrls: ['./boardoverlay.component.scss', './boardoverlay.responsive.scss']
})
export class BoardoverlayComponent {

  taskService = inject(TasksService);

  isVisible = true;

  show() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.close();
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BoardoverlayComponent } from './boardoverlay/boardoverlay.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { TasksService } from '../../shared/services/firebase/tasks.service';
import { SingleCardComponent } from './single-card/single-card.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoardoverlayComponent, CdkDropList, CdkDrag, SingleCardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  taskService = inject(TasksService);

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  inProgress = ['Get the document', 'Write project report', 'Fix login issue', 'Prepare presentation'];

  awaitingFeedback = ['responsive', 'Review design mockup', 'Client approval on proposal', 'Code review from team'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
        //TODO: find a solution ?! irgendwie so ==> this.taskService.updateTask(this.taskService.currentlySelectedTask);
      );
    }
  }
}

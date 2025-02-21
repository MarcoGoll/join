import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
<<<<<<< HEAD
import { BoardoverlayComponent } from './boardoverlay/boardoverlay.component';
=======
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
>>>>>>> 19058eeaefcc4bcae79de20f1921d50aaf2147a3

@Component({
  selector: 'app-board',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, BoardoverlayComponent],
=======
  imports: [CdkDropList, CdkDrag],
>>>>>>> 19058eeaefcc4bcae79de20f1921d50aaf2147a3
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent { 

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
      );
    }
  }
}

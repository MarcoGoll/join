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
import { Task } from '../../shared/interfaces/task';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    BoardoverlayComponent,
    CdkDropList,
    CdkDrag,
    SingleCardComponent,
    AddTaskComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  taskService = inject(TasksService);
  isAddTaskOverlayDisplayed: boolean = false;

  toggleIsAddTaskOverlayDisplayed() {
    this.isAddTaskOverlayDisplayed = !this.isAddTaskOverlayDisplayed;
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex); // brauchen wir erstmal nicht, weil wir nicht mit prios arbeiten
    } else {
      // if (event.container.data[0]) {
      //   event.previousContainer.data[event.previousIndex].status = event.container.data[0].status;

      // }
      switch (event.container.id) {
        case 'cdk-drop-list-0':
          event.previousContainer.data[event.previousIndex].status = 'toDo';
          break;
        case 'cdk-drop-list-1':
          event.previousContainer.data[event.previousIndex].status =
            'inProgress';
          break;
        case 'cdk-drop-list-2':
          event.previousContainer.data[event.previousIndex].status =
            'awaitFeedback';
          break;
        case 'cdk-drop-list-3':
          event.previousContainer.data[event.previousIndex].status = 'done';
          break;
        default:
          console.error('container id is not known');
          break;
      }
      this.taskService.updateTask(
        event.previousContainer.data[event.previousIndex]
      );

      event.previousContainer.data.splice(event.previousIndex, 1);
      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex,
      // );
      console.log(event);
    }
  }
  // toggleBoard(){
  //   let searchBoard = document.querySelector('.search-board');
  //   let taskBoard = document.querySelector('.task-board');
  //   let searchInput = document.querySelector('.search-input');

  //   if (searchInput && searchBoard && taskBoard) {
  //     searchInput.addEventListener('input', () => {
  //         if (searchInput.value.length > 3) {
  //             searchBoard.style.display = 'block';
  //             taskBoard.style.display = 'none';
  //         } else {
  //             searchBoard.style.display = 'none';
  //             taskBoard.style.display = 'block';
  //         }
  //     });
  // }
  // }
}

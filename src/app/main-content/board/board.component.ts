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
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
  templateUrl: './board.component.html',
  styleUrls: [
    './board.component.scss', 
    './board.responsive.scss'
  ]
})
export class BoardComponent {
  taskService = inject(TasksService);
  isTaskinEditMode: boolean = false;
  statusToBeUsed: 'toDo' | 'inProgress' | 'awaitFeedback' | 'done' = 'toDo';
  searchString: string = '';
  allSearchResults: Task[] = [];
  isSearchActive: boolean = false;

  setStatusToBeUsed(status: 'toDo' | 'inProgress' | 'awaitFeedback' | 'done') {
    this.statusToBeUsed = status;
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // TODO: Drag&Drop within same Column
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex); // brauchen wir erstmal nicht, weil wir nicht mit prios arbeiten
    } else {
      //Drag&Drop between different Columns
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
    }
  }

  searchTask() {
    if (this.searchString.length < 3) {
      console.log('du darfst nicht suchen');
      this.isSearchActive = false;
    } else {
      this.allSearchResults = this.taskService.searchTasks(this.searchString);
      this.isSearchActive = true;
      console.log('Ergebnisse: ', this.allSearchResults);
    }
  }

  isTaskInSearchResult(task: Task) {
    let allSearchResultsIDs: string[] = [];

    this.allSearchResults.forEach((searchResult) => {
      if (searchResult.id) {
        allSearchResultsIDs.push(searchResult.id);
      }
    });

    if (task.id) {
      if (allSearchResultsIDs.includes(task.id)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
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

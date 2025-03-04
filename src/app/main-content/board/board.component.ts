import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  HostListener,
  Injectable,
  OnInit,
} from '@angular/core';
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
import { RouterLink } from '@angular/router';

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
    RouterLink,
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss', './board.responsive.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class BoardComponent implements OnInit {
  taskService = inject(TasksService);
  isTaskinEditMode: boolean = false;
  searchString: string = '';
  allSearchResults: Task[] = [];
  isSearchActive: boolean = false;
  isMobileView: boolean = false;
  isDragDisabled = window.innerWidth >= 1200;

  ngOnInit() {
    this.checkScreenSize();
  }

  clicked: boolean = false;

  changeImage() {
    this.clicked = true;
    setTimeout(() => {
      this.clicked = false;
    }, 3000); // Das Bild nach 300ms zurücksetzen (anpassbar)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
    this.isDragDisabled = window.innerWidth >= 1200;
  }

  private checkScreenSize(): void {
    this.isMobileView = window.innerWidth <= 1200;
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // TODO: Drag&Drop within same Column
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex); // brauchen wir erstmal nicht, weil wir nicht mit prios arbeiten
    } else {
      //Drag&Drop between different Columns
      const task = event.previousContainer.data[event.previousIndex];

      if (!task) {
        console.error('Task nicht gefunden');
        return;
      }

      console.log('Container ID: ', event.container.id);
      switch (event.container.id) {
        case 'toDoList':
          task.status = 'toDo';
          break;
        case 'inProgressList':
          task.status = 'inProgress';
          break;
        case 'awaitFeedbackList':
          task.status = 'awaitFeedback';
          break;
        case 'doneList':
          task.status = 'done';
          break;
        default:
          console.error('Unbekannte Container-ID:', event.container.id);
          return;
      }
      console.log('Task wird upgetadet zu: ', task);
      this.taskService.updateTask(task);
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

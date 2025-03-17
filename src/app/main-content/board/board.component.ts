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
import { NavbarService } from '../../shared/services/navbar.service';

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
  navbarService = inject(NavbarService);
  isTaskinEditMode: boolean = false;
  searchString: string = '';
  allSearchResults: Task[] = [];
  isSearchActive: boolean = false;
  isMobileView: boolean = false;
  isDragDisabled = window.innerWidth >= 1200;
  clicked: boolean = false;

  /**
   * Lifecycle hook that is called when the component is initialized.
   * Performs a check of the screen size.
   */
  ngOnInit() {
    this.checkScreenSize();
  }

  /**
   * Changes the `clicked` state to `true` and resets it after 3 seconds.
   * Can be used to control a temporary image change.
   */
  changeImage() {
    this.clicked = true;
    setTimeout(() => {
      this.clicked = false;
    }, 3000);
  }

  /**
   * Responds to window resize events.
   * Updates the screen size and disables dragging on large displays.
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
    this.isDragDisabled = window.innerWidth >= 1200;
  }

  /**
   * Checks the screen size and sets `isMobileView`.
   */
  private checkScreenSize(): void {
    this.isMobileView = window.innerWidth <= 1200;
  }

  /**
   * Handles the drag-and-drop event for tasks.
   * @param {CdkDragDrop} event - The CdkDragDrop event with the moved tasks.
   *
   * Updates the task status when it is moved between columns.
   * Calls the task service to save the changes.
   */
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // TODO: Drag&Drop within same Column
    } else {
      //Drag&Drop between different Columns
      const task = event.previousContainer.data[event.previousIndex];
      if (!task) {
        console.error('Task nicht gefunden');
        return;
      }
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
      this.taskService.updateTask(task);
      event.previousContainer.data.splice(event.previousIndex, 1);
    }
  }

  /**
   * Searches for tasks based on the search string.
   * Activates the search only if the search string is at least 3 characters long.
   */
  searchTask() {
    if (this.searchString.length < 3) {
      this.isSearchActive = false;
    } else {
      this.allSearchResults = this.taskService.searchTasks(this.searchString);
      this.isSearchActive = true;
    }
  }

  /**
   * Checks if a given task is included in the search results.
   * @param {Task} task - The task to check.
   * @returns {boolean} `true` if the task is in the search results, otherwise `false`.
   */
  isTaskInSearchResult(task: Task): boolean {
    return task.id
      ? this.allSearchResults.some(
          (searchResult) => searchResult.id === task.id
        )
      : false;
  }
}

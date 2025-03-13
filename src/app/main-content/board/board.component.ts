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
   * Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird.
   * Führt eine Prüfung der Bildschirmgröße durch.
   */
  ngOnInit() {
    this.checkScreenSize();
  }


  /**
   * Ändert den Zustand `clicked` auf `true` und setzt ihn nach 3 Sekunden zurück.
   * Kann genutzt werden, um eine temporäre Bildänderung zu steuern.
   */
  changeImage() {
    this.clicked = true;
    setTimeout(() => {
      this.clicked = false;
    }, 3000); // Das Bild nach 3000ms zurücksetzen (anpassbar)
  }

  /**
   * Reagiert auf das Ändern der Fenstergröße.
   * Aktualisiert die Bildschirmgröße und deaktiviert das Ziehen bei großen Displays.
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
    this.isDragDisabled = window.innerWidth >= 1200;
  }

  /**
   * Überprüft die Bildschirmgröße und setzt `isMobileView`.
   * Erkennt mobile Ansicht bei einer Breite von ≤ 1200px.
   */
  private checkScreenSize(): void {
    this.isMobileView = window.innerWidth <= 1200;
  }

  /**
    * Behandelt das Drag-and-Drop-Ereignis für Aufgaben.
    * @param event - Das CdkDragDrop-Ereignis mit den verschobenen Aufgaben.
    * 
    * Aktualisiert den Status der Aufgabe, wenn sie zwischen Spalten verschoben wird.
    * Ruft den Task-Service auf, um die Änderungen zu speichern.
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
   * Sucht nach Aufgaben basierend auf dem Suchstring.
   * Aktiviert die Suche nur, wenn der Suchstring mindestens 3 Zeichen lang ist.
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
   * Prüft, ob eine gegebene Aufgabe in den Suchergebnissen enthalten ist.
   * @param task - Die zu überprüfende Aufgabe.
   * @returns `true`, wenn die Aufgabe in den Suchergebnissen enthalten ist, sonst `false`.
   */
  isTaskInSearchResult(task: Task): boolean {
    return task.id 
      ? this.allSearchResults.some(searchResult => searchResult.id === task.id) 
      : false;
  }
}

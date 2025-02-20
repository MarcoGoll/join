import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BoardoverlayComponent } from './boardoverlay/boardoverlay.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoardoverlayComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent { 

}

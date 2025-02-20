
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-boardoverlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boardoverlay.component.html',
  styleUrls: ['./boardoverlay.component.scss', './boardoverlay.responsive.scss']
})
export class BoardoverlayComponent {
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

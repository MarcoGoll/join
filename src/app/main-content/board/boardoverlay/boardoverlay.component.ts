
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TasksService } from '../../../shared/services/firebase/tasks.service';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';

@Component({
  selector: 'app-boardoverlay',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boardoverlay.component.html',
  styleUrls: ['./boardoverlay.component.scss', './boardoverlay.responsive.scss']
})
export class BoardoverlayComponent {

  taskService = inject(TasksService); 
  contactService = inject(ContactsService); 

  isVisible = true;
  isEditMode = false;

  show() {
    this.isVisible = true; 
  }

  close() {
    this.isVisible = false;
    this.isEditMode = false; 
  }

  closeEdit() {
    this.isEditMode = false;
  }

  openEditModal() {
    this.isEditMode = true;
    this.isVisible = false;
}

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) { 
      this.close();
    }
  }

  closeEditModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('edit-overlay')) {
      this.closeEdit();
    }
  }
}

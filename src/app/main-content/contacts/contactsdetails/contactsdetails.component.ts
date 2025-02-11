import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contactsdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactsdetails.component.html',
  styleUrl: './contactsdetails.component.scss'
})
export class ContactsdetailsComponent {
  selectedContent: any = true;
}

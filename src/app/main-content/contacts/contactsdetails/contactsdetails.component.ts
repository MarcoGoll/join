import { CommonModule } from '@angular/common';
import { Component, Input, isDevMode } from '@angular/core';
import { ContactsService } from '../../../shared/services/firebase/contacts.service';
import { Contact } from '../../../shared/interfaces/contact';

@Component({
  selector: 'app-contactsdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactsdetails.component.html',
  styleUrls: ['./contactsdetails.component.scss', './contactsdetails.responsive.scss']
})
export class ContactsdetailsComponent {
  @Input("isMobileView") isMobileView: boolean = false;
  isMoreControlOverviewShown: boolean = false

  constructor(public contactService: ContactsService) {
  }

  toggleMoreControlOverview() {
    this.isMoreControlOverviewShown = !this.isMoreControlOverviewShown;
  }

}



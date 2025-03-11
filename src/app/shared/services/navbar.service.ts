import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  isSummarySelected: boolean = false;
  isAddTaskSelected: boolean = false;
  isBoardSelected: boolean = false;
  isContactSelected: boolean = false;
  isPrivacyPolicySelected: boolean = false;
  isLegalNoticeSelected: boolean = false;

  constructor() {}

  setSelection(id: string) {
    this.isSummarySelected = false;
    this.isAddTaskSelected = false;
    this.isBoardSelected = false;
    this.isContactSelected = false;
    this.isPrivacyPolicySelected = false;
    this.isLegalNoticeSelected = false;

    switch (id) {
      case 'summary':
        this.isSummarySelected = true;
        break;
      case 'addTask':
        this.isAddTaskSelected = true;
        break;
      case 'board':
        this.isBoardSelected = true;
        break;
      case 'contact':
        this.isContactSelected = true;
        break;
      case 'privacyPolicy':
        this.isPrivacyPolicySelected = true;
        break;
      case 'legal':
        this.isLegalNoticeSelected = true;
        break;
      default:
        console.log('Identifier is not known');
    }
  }
}

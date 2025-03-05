import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { LegalNoticeComponent } from './shared/components/navbar/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './shared/components/navbar/privacy-policy/privacy-policy.component';
import { ContactsComponent } from './main-content/contacts/contacts.component';
import { InfoComponent } from './shared/components/header/info/info.component';
import { BoardComponent } from './main-content/board/board.component';
import { AddTaskComponent } from './main-content/add-task/add-task.component';
import { SignupComponent } from './main-content/signup/signup.component';
import { LoginComponent } from './main-content/login/login.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'legalNotice', component: LegalNoticeComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
  { path: 'contact', component: ContactsComponent },
  { path: 'board', component: BoardComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'info', component: InfoComponent },
];

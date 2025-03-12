import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { LegalNoticeComponent } from './shared/components/navbar/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './shared/components/navbar/privacy-policy/privacy-policy.component';
import { ContactsComponent } from './main-content/contacts/contacts.component';
import { InfoComponent } from './shared/components/header/info/info.component';
import { BoardComponent } from './main-content/board/board.component';
import { AddTaskComponent } from './main-content/add-task/add-task.component';
import { SummaryComponent } from './main-content/summary/summary.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './main-content/login/login.component';
import { SignupComponent } from './main-content/signup/signup.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'legalNotice', component: LegalNoticeComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
  { path: 'contact', component: ContactsComponent, canActivate: [authGuard] },
  { path: 'board', component: BoardComponent, canActivate: [authGuard] },
  { path: 'addTask', component: AddTaskComponent, canActivate: [authGuard] },
  { path: 'info', component: InfoComponent, canActivate: [authGuard] },
  { path: 'summary', component: SummaryComponent, canActivate: [authGuard] },

  // Wildcard route für alle unbekannten Routen
  { path: '**', redirectTo: '/' },
];

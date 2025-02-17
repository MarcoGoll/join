import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { LegalNoticeComponent } from './shared/components/navbar/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './shared/components/navbar/privacy-policy/privacy-policy.component';
import { ContactsComponent } from './main-content/contacts/contacts.component';
import { InfoComponent } from './shared/components/header/info/info.component';

export const routes: Routes = [
    { path: '', component: MainContentComponent },
    { path: 'legalNotice', component: LegalNoticeComponent },
    { path: 'privacyPolicy', component: PrivacyPolicyComponent },
    { path: 'contact', component: ContactsComponent },
    { path: 'info', component: InfoComponent }
];  

import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../shared/services/firebase/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NavbarService } from '../../shared/services/navbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login.responsive.scss'],
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  authenticationService = inject(AuthenticationService);
  navbarService = inject(NavbarService);

  email: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;
  showAnimation: boolean = false;

  /**
   * ngOnInit - Initialisiert den Login-Status und Fehlerbehandlung.
   * Setzt die Anzeige für Login und eventuelle Fehlermeldungen zurück.
   */
  ngOnInit(): void {
    this.authenticationService.isLoginSignUpView = true;
    this.authenticationService.errorOccoursIn = null;
    this.authenticationService.errorMessageForFailedFirebaseRequest = '';
  }

  /**
   * Konstruktor - Führt Überprüfungen für Login und den ersten Besuch durch.
   * Ruft `checklogin` und `checkFirstVisit` beim Erstellen der Komponente auf.
   */
  constructor() {
    this.checklogin();
    this.checkFirstVisit();
  }

  /**
   * checklogin - Überprüft den Login-Status des Benutzers.
   * Leitet den Benutzer zur Zusammenfassungsseite weiter, wenn er eingeloggt ist.
   */
  async checklogin() {
    await this.authenticationService.checkLogin();
    if (this.authenticationService.isUserLoggedIn) {
      this.router.navigate(['/summary']);
      this.navbarService.setSelection('summary');
    }
  }

  /**
   * checkFirstVisit - Überprüft, ob der Benutzer zum ersten Mal die Login-Seite besucht.
   * Zeigt eine Animation beim ersten Besuch an und setzt einen Marker, wenn sie gespielt wurde.
   */
  checkFirstVisit() {
    if (!this.authenticationService.isLoginAnnimationPlayedOnce) {
      this.showAnimation = true;
      setTimeout(() => {
        this.showAnimation = false;
        this.authenticationService.isLoginAnnimationPlayedOnce = true;
      }, 2000);
    }
  }

  /**
   * login - Meldet den Benutzer mit einer E-Mail und einem Passwort an.
   * Ruft die Login-Funktion des Authentifizierungsservices auf.
   */
  login(email: string, pw: string) {
    this.authenticationService.login(email, pw);
  }

  /**
   * loginAsGuest - Meldet den Benutzer als Gast an.
   * Verwendet vordefinierte Gast-Benutzerdaten aus dem Authentifizierungsservice.
   */
  loginAsGuest() {
    this.authenticationService.login(
      this.authenticationService.GUESTUSER.email,
      this.authenticationService.GUESTUSER.pw
    );
  }

  /**
   * toggleIsPasswordVisible - Schaltet die Sichtbarkeit des Passworts um.
   * Ändert den Zustand der Passwortsichtbarkeit.
   */
  toggleIsPasswordVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  /**
   * onSubmit - Wird bei der Formularübermittlung aufgerufen.
   * Markiert alle Formulareingaben als berührt und führt den Login-Prozess durch, wenn das Formular gültig ist.
   */
  onSubmit(ngForm: NgForm) {
    ngForm.control.markAllAsTouched();
    if (ngForm.submitted && ngForm.form.valid) {
      this.authenticationService.resetFirebaseError();
      this.login(this.email, this.password);
    }
  }
}

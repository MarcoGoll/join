import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './shared/services/firebase/authentication.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  await authenticationService.checkLogin();

  if (authenticationService.isUserLoggedIn) {
    console.log(
      'Guard USER LOGIN STATUS: ',
      authenticationService.isUserLoggedIn
    );
    return true; // Erlaubt den Zugriff
  } else {
    console.log(
      'Guard USER LOGIN STATUS: ',
      authenticationService.isUserLoggedIn
    );
    return router.createUrlTree(['/']); // Weiterleitung zum Login
  }
};

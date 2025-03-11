import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './shared/services/firebase/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isUserLoggedIn) {
    return true; // Erlaubt den Zugriff
  } else {
    return router.createUrlTree(['/login']); // Weiterleitung zum Login
  }
};

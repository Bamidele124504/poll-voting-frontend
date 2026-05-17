import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router,
} from '@angular/router';

import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = () => {

  const authService =
    inject(AuthService);

  const router =
    inject(Router);

  // Must be admin
  if (authService.isAdmin()) {

    return true;
  }

  // Redirect normal users
  router.navigate(['/']);

  return false;
};
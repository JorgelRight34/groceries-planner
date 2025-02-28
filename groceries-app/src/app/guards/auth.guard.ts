import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    const expiration = decoded.exp;
    const now = Date.now() / 1000;

    if (expiration && expiration < now) {
      router.navigate(['login']);
      return false
    }
  } else {
    router.navigate(['login']);
    return false;
  }

  if (!authService.user()) {
    authService.getUser()
  }

  return true;
};

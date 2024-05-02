import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard = () => {
  inject(AuthService).isLogged || inject(Router).navigate(['auth/login/']);
};

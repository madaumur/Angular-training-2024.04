import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./views/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./views/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**',
    redirectTo: 'register',
    pathMatch: 'prefix',
  },
];

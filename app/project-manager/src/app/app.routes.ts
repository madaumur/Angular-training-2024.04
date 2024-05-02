import { Routes } from '@angular/router';
import { authGuard } from '../auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../common/views/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./../auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'project',
    loadChildren: () =>
      import('./../project/project.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

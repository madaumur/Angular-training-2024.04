import { Routes } from '@angular/router';
import { projectResolver } from './project.resolvers';

export const routes: Routes = [
  {
    path: 'list',
    loadComponent: () =>
      import('./views/project-list/project-list.component').then(
        (m) => m.ProjectListComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./views/project-edit/project-edit.component').then(
        (m) => m.ProjectEditComponent
      ),
    resolve: { project: projectResolver },
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'prefix',
  },
];

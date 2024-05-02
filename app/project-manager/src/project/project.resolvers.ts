import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Project } from './project.model';
import { inject } from '@angular/core';
import { ProjectService } from './project.service';

// on créé une fonction resolver qui va expliquer comment récup les données
export const projectResolver: ResolveFn<Observable<Project | undefined>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  const id: number = +(route.paramMap.get('id') ?? '0');

  return id && !isNaN(id)
    ? inject(ProjectService)
        .byId(id)
        .pipe(
          catchError((err) => {
            router.navigate(['0']);
            return throwError(() => err);
          })
        )
    : of(undefined);
};

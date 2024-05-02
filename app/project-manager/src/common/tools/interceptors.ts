import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../environments/environment';

// Interceptor pour modifié l'url de l'API, rajoute API_URL devant ENDPOINT
export const backendInterceptor: HttpInterceptorFn = (req, next) => {
  const url: string = req.url;
  if (url.startsWith('/')) req = req.clone({ url: environment.API_URL + url });
  return next(req);
};

export const cursorLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  document.body.classList.add('cursor-wait');
  return next(req).pipe(
    finalize(() => document.body.classList.remove('cursor-wait'))
  );
};

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(AuthService);
  const token = service.token;
  if (token && req.url.startsWith(environment.API_URL)) {
    // Replace la requete existante par une copie avec des modifications
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(req).pipe(
      catchError((err) => {
        if (err.status === 401) service.logout();
        return throwError(() => err);
      })
    );
  }
  return next(req);
};

import { ApplicationConfig } from "@angular/core";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { routes } from "./app.routes";
import { tokenInterceptor } from "../services/auth.service";
import { environment } from "../environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: "top" })
    ),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          if (req.url.startsWith("/"))
            req = req.clone({
              url: environment.API_URL + req.url,
            });
          return next(req);
        },
        tokenInterceptor,
      ])
    ),
  ],
};

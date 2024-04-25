import { Router, Routes } from "@angular/router";
import { inject } from "@angular/core";
import { HomeComponent } from "../views/home/home.component";
import { articleResolver } from "../views/article-editor/article-editor.component";
import { AuthService, authGuard } from "../services/auth.service";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "auth",
    loadChildren: () => import("../auth/auth.routes").then((m) => m.routes),
  },
  {
    path: "editor/:id",
    loadComponent: () =>
      import("../views/article-editor/article-editor.component").then(
        (m) => m.ArticleEditorComponent
      ),
    canActivate: [authGuard],
    resolve: { article: articleResolver },
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full", // toujours en dernier pour récupérer les url qui match rien
  },
];

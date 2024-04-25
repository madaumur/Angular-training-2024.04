import { Routes } from "@angular/router";
import { HomeComponent } from "../views/home/home.component";

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
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full", // toujours en dernier pour récupérer les url qui match rien
  },
];

import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () =>
      import("../components/login/login.component").then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: "register",
    loadComponent: () =>
      import("../components/register/register.component").then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: "**",
    redirectTo: "login",
    pathMatch: "prefix", // toujours en dernier pour récupérer les url qui match rien
  },
];

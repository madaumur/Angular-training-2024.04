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
];

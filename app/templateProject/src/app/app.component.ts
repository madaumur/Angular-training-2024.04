import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../components/header/header.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { HomeComponent } from "../views/home/home.component";
import { LoginComponent } from "../components/login/login.component";
import { RegisterComponent } from "../components/register/register.component";
import { ArticleEditorComponent } from "../views/article-editor/article-editor.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ArticleEditorComponent,
  ],
})
export class AppComponent {
  ask: any;
  title: string = "Title frome AppComponent";

  reactToChild(message: string): void {
    console.log(message);
  }
}

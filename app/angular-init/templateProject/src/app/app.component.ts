import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../components/header/header.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { HomeComponent } from "../views/home/home.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, SidebarComponent, HomeComponent]
})
export class AppComponent {
  ask: any;
  title: string = "Title frome AppComponent";

  reactToChild(message: string): void {
    console.log(message)
  }
}

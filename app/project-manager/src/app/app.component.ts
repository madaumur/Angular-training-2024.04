import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../common/components/header/header.component';
import { SidebarComponent } from '../common/components/sidebar/sidebar.component';
import { WaiterComponent } from '../common/components/waiter/waiter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, WaiterComponent],
})
export class AppComponent {
  title = 'project-manager';
}

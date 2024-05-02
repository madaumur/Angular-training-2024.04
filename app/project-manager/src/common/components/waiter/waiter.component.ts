import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-waiter',
  standalone: true,
  imports: [],
  templateUrl: './waiter.component.html',
  styleUrl: './waiter.component.css',
})
export class WaiterComponent {
  constructor(private router: Router) {
    router.events.subscribe({
      next: (event) => {
        switch (true) {
          case event instanceof NavigationStart:
            this.navigating = true;
            break;
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError:
          case event instanceof NavigationSkipped:
            this.navigating = false;
            break;
        }
      },
    });
  }

  navigating: boolean = false;
}

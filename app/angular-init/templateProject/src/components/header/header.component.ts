import {Component, Input} from '@angular/core';
import {AuthorPipe} from '../../pipes/author.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AuthorPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input()
  title: string = "Editorial";
  me: Person = {
    lastName: 'Doe',
    firstName: 'John'
  }
}

export interface Person {
  lastName: string;
  firstName: string;
}

import { Component } from '@angular/core';
import {MiniPostComponent} from '../mini-post/mini-post.component';
import {MiniPost} from '../../models/mini-post';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [MiniPostComponent]
})
export class SidebarComponent {
  post1: MiniPost = {
    href: '#',
    src: 'pic02.jpg',
    alt: 'test',
    description: 'Post origin : sidebar'
  };
}

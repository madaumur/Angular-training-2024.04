import {Component} from '@angular/core';
import {MiniPost} from '../../models/mini-post';

@Component({
  selector: 'app-mini-post',
  standalone: true,
  imports: [],
  templateUrl: './mini-post.component.html',
  styleUrl: './mini-post.component.css'
})
export class MiniPostComponent {
  post: MiniPost = {
    href: '#',
    src: 'pic07.jpg',
    alt: 'test',
    description: 'Post origin : MiniPostCompo'
  };
}

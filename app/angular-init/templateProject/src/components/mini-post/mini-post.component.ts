import { Component, Input } from '@angular/core';
import { MiniPost } from '../../models/mini-post';

@Component({
  selector: 'app-mini-post',
  standalone: true,
  imports: [],
  templateUrl: './mini-post.component.html',
  styleUrl: './mini-post.component.css',
})
export class MiniPostComponent {
  @Input() post!: MiniPost;

  @Input() first: boolean = false;
}

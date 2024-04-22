import {Component, EventEmitter, Output} from '@angular/core';
import {MiniPostComponent} from '../mini-post/mini-post.component';
import {MiniPost} from '../../models/mini-post';
import {SearchComponent} from "../search/search.component";


@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [MiniPostComponent, SearchComponent]
})
export class SidebarComponent {

  // @Output = Prépare le composant en ENVOYER une informtion aux parents
  @Output() ask: EventEmitter<string> = new EventEmitter(); // un Output est toujours un EventEmitter d'un type de données

  parentValue: string = "Parent Value";

  post1: MiniPost = {
    href: '#',
    src: 'pic02.jpg',
    alt: 'test',
    description: 'Post origin : sidebar'
  };


  askForMore(): void {
    console.log("Click on MORE button.")
    this.ask.emit("Blop"); // Les données passées dans le "emit" sont récupérées avec "$event"
  }
}

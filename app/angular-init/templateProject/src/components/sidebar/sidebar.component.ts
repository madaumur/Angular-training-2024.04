import { Component, EventEmitter, Output } from "@angular/core";
import { MiniPostComponent } from "../mini-post/mini-post.component";
import { MiniPost } from "../../models/mini-post";
import { SearchComponent } from "../search/search.component";
import { TruncatePipe } from "../../pipes/truncate.pipe";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-sidebar",
  standalone: true,
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
  imports: [MiniPostComponent, SearchComponent, TruncatePipe, RouterLink],
})
export class SidebarComponent {
  // @Output = Prépare le composant en ENVOYER une informtion aux parents
  @Output() ask: EventEmitter<string> = new EventEmitter(); // un Output est toujours un EventEmitter d'un type de données

  parentValue: string = "Parent Value";

  miniPost1: MiniPost = {
    href: "#",
    src: "pic02.jpg",
    alt: "pic02",
    description: "Post from sidebar | pic2",
  };

  miniPosts: MiniPost[] = [
    this.miniPost1,
    {
      href: "#",
      src: "pic07.jpg",
      alt: "pic07",
      description: "Post from sidebar | pic7",
    },
    {
      href: "#",
      alt: "no image",
      description: "Post from sidebar | no-pic",
    },
    {
      href: "#",
      src: "pic08.jpg",
      alt: "pic08",
      description: "Post from sidebar | pic8",
    },
  ];

  constructor(protected authService: AuthService) {}

  askForMore(): void {
    console.log("Click on MORE button.");
    this.ask.emit("Blop"); // Les données passées dans le "emit" sont récupérées avec "$event"
  }

  reactToChild(value: string): void {
    this.parentValue = value;
  }

  logout() {
    this.authService.logout();
  }
}

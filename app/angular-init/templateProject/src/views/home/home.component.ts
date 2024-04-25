import { Observable } from "rxjs";
import { ArticleService } from "./../../services/article.service";
import { Component } from "@angular/core";
import { Article } from "../../models/article";
import { AsyncPipe } from "@angular/common";
import { subscribeOnce } from "../../tools/observable-helper";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  // constructor(articleService: ArticleService) {
  //   articleService.all().subscribe({
  //     next: (result) => (this.data = result),
  //   });
  // }
  // data: Article[] = [];

  data!: Observable<Article[]>;

  constructor(private articleService: ArticleService) {
    this.fetchAll();
  }

  fetchAll(): void {
    this.data = this.articleService.all();
  }

  deleteArticle(articleId: number): void {
    subscribeOnce(this.articleService.delete(articleId), {
      next: () => this.fetchAll(),
    });
  }
}

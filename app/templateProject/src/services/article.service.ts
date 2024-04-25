import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Article } from "../models/article";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { AbstractService } from "../tools/abstract-service";

@Injectable({
  providedIn: "root",
})
export class ArticleService extends AbstractService<Article> {
  readonly ENDPOINT: string = `${environment.API_URL}/664/articles`;

  constructor(http: HttpClient) {
    super(http);
  }

  override update(object: Article): Observable<Article> {
    return this.http.put<Article>(`${this.ENDPOINT}/${object.id}`, object);
  }
}

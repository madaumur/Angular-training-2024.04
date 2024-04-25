import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AbstractFormComponent } from "../../tools/abstract-form-component";
import { ErrorMessageComponent } from "../../components/error-message/error-message.component";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, catchError, of, throwError } from "rxjs";
import { ArticleService } from "../../services/article.service";
import { subscribeOnce } from "../../tools/observable-helper";
import { Article } from "../../models/article";

@Component({
  selector: "app-article-editor",
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: "./article-editor.component.html",
  styleUrl: "./article-editor.component.css",
})
export class ArticleEditorComponent extends AbstractFormComponent {
  constructor(
    protected route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {
    super();
    route.data.subscribe({
      next: ({ article }): void => {
        if (article) this.form.patchValue(article);
        else this.form.reset();
      },
    });
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    src: new FormControl(""),
    alt: new FormControl("image", {
      validators: [Validators.required],
      nonNullable: true,
    }),
    titre: new FormControl("", {
      validators: [Validators.required],
    }),
    description: new FormControl("", {
      validators: [Validators.required],
    }),
    lien: new FormControl("", {
      validators: [Validators.required],
    }),
  });

  onSubmit$(): void {
    const formValue = this.form.value;

    subscribeOnce(
      formValue.id
        ? this.articleService.update(formValue)
        : this.articleService.save(formValue),
      {
        next: () => this.router.navigate([""]),
      }
    );
  }
}

// on créé une fonction resolver qui va expliquer comment récup les données
export const articleResolver: ResolveFn<Observable<Article | undefined>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Article | undefined> => {
  const router = inject(Router);
  const id: number = +(route.paramMap.get("id") ?? "0");
  return id && !isNaN(id)
    ? inject(ArticleService)
        .byId(id)
        .pipe(
          catchError((err): Observable<never> => {
            router.navigate(["/editor/0"]);
            return throwError(() => err);
          })
        )
    : of(undefined);
};

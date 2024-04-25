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
  ParamMap,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of, switchMap, throwError } from "rxjs";
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
    // un Snapshot donnera les donées à un instant T sansprendre en compte le refresh
    // const paramMap: ParamMap = route.snapshot.paramMap;
    // console.log("snapshot :" + paramMap.get("id"));

    // un Observable permet de suivre les changements sur une données
    const paramMap$: Observable<ParamMap> = route.paramMap;

    /* peudo mauvaise pratique : utiliser un observable dans un autre


    paramMap$.subscribe({
      next: (value: ParamMap): void => {
        const id: number = +(value.get("id") ?? "0");

        if (id) {
          subscribeOnce(articleService.byId(+id), {
            next: (article) => this.form.patchValue(article),
            error: () => this.router.navigate(["/editor/0"]),
          });
        } else {
          this.form.reset({
            titre: "un nouveau titre?",
          });
        }
      },
      error: (err) => console.log("Error :" + err),
      complete: () => console.log("Observable complete"),
    });

    */

    //switchMap permet de passer d'un observable à un autre
    paramMap$
      .pipe(
        switchMap((paramMap) => {
          const id: number = +(paramMap.get("id") ?? "0");
          if (id && !isNaN(id)) return articleService.byId(id);
          // creer un observable qui déclenchera uniquement le cas error
          else return throwError(() => new Error("Article Id invalide"));
        })
      )
      .subscribe({
        next: (article) => this.form.patchValue(article),
        error: () => {
          //       if (!this.form.value.id)
          this.router.navigate(["/editor/0"]).then(() => {
            console.log("Reset du form");
            this.form.reset({
              titre: "Un Nouveau Titre",
            });
          });
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
  const id: number = +(route.paramMap.get("id") ?? "0");
  return id && !isNaN(id) ? inject(ArticleService).byId(id) : of(undefined);
};

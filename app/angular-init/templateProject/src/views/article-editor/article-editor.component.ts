import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AbstractFormComponent } from "../../tools/abstract-form-component";
import { ErrorMessageComponent } from "../../components/error-message/error-message.component";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ArticleService } from "../../services/article.service";
import { subscribeOnce } from "../../tools/observable-helper";

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

    const paramMap: ParamMap = route.snapshot.paramMap;
    console.log("snapshot :" + paramMap.get("id"));

    // un Observable permetde suivre les changements sur une données
    const paramMap$: Observable<ParamMap> = route.paramMap;

    paramMap$.subscribe({
      next(value: ParamMap) {
        console.log("snapshot :" + value.get("id"));
      },
      error: (err) => console.log("Error :" + err),
      complete: () => console.log("Observable complete"),
    });
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    src: new FormControl(""),
    alt: new FormControl("", {
      validators: [Validators.required],
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
    subscribeOnce(this.articleService.save(this.form.value), {
      next: () => this.router.navigate([""]),
    });
  }
}

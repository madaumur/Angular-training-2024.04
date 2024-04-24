import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AbstractFormComponent} from '../../tools/abstract-form-component';
import {ErrorMessageComponent} from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './article-editor.component.html',
  styleUrl: './article-editor.component.css'
})
export class ArticleEditorComponent extends AbstractFormComponent {

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    src: new FormControl(''),
    alt: new FormControl('', {
      validators: [Validators.required]
    }),
    titre: new FormControl('', {
      validators: [Validators.required]
    }),
    description: new FormControl('', {
      validators: [Validators.required]
    }),
    lien: new FormControl('', {
      validators: [Validators.required]
    })
  });

  override onSubmit$(): void {
    console.log(this.form.value);
  }
}

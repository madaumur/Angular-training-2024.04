import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AbstractFormComponent } from '../../../common/components/abstract-form-component';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeOnce } from '../../../common/tools/observable-helper';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css',
})
export class ProjectEditComponent extends AbstractFormComponent {
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {
    super();
    route.data.subscribe({
      next: ({ project }): void => {
        if (project) this.form.patchValue(project);
        else {
          this.form.reset();
        }
      },
    });
  }

  projectForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
    startDate: new FormControl('', {
      validators: [Validators.required],
    }),
    endDate: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  override form: FormGroup<any> = this.projectForm;

  override onSubmit$(): void {
    const projectFormValue = this.projectForm.value;

    subscribeOnce(
      projectFormValue.id
        ? this.projectService.update(projectFormValue)
        : this.projectService.save(projectFormValue),
      {
        next: () => this.router.navigate(['project/list']),
      }
    );
  }
}

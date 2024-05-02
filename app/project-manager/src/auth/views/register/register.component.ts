import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AbstractFormComponent } from '../../../common/components/abstract-form-component';
import { subscribeOnce } from '../../../common/tools/observable-helper';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent extends AbstractFormComponent {
  constructor(private router: Router, protected authService: AuthService) {
    super();
  }

  // variable pour afficher / cacher le mdp
  isPasswordVisible: boolean = false;

  // formulaire de création de compte
  registerForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  // on donne notre formulaire dans le formulaire générique
  override form: FormGroup<any> = this.registerForm;

  // on réécrit notre méthode onSubmit pour correspondre à ce formulaire
  override onSubmit$(): void {
    console.log('[LOG] Register - Submit');
    if (this.registerForm.valid)
      subscribeOnce(this.authService.register(this.form.value), () =>
        this.router.navigate(['/auth/login'])
      );
  }
}

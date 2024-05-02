import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AbstractFormComponent } from '../../../common/components/abstract-form-component';
import { AuthService } from '../../auth.service';
import { subscribeOnce } from '../../../common/tools/observable-helper';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent extends AbstractFormComponent {
  constructor(private router: Router, private authService: AuthService) {
    super();
  }

  // formulaire des infos de connexion
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  // on donne notre formulaire dans le formulaire générique
  override form: FormGroup<any> = this.loginForm;

  // on réécrit notre méthode onSubmit pour correspondre à ce formulaire
  override onSubmit$(): void {
    console.log('[LOG] Login - Submit');
    if (this.loginForm.valid)
      subscribeOnce(this.authService.login(this.form.value), () =>
        this.router.navigate(['/'])
      );
  }
}

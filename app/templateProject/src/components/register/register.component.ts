import { AuthService } from "./../../services/auth.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { AbstractFormComponent } from "../../tools/abstract-form-component";
import { subscribeOnce } from "../../tools/observable-helper";

@Component({
  selector: "app-register",
  standalone: true,
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
  imports: [ReactiveFormsModule, ErrorMessageComponent],
})
export class RegisterComponent extends AbstractFormComponent {
  //onmet une condition de visibilité surrouter pour automatiquement créer une variable router
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  pwdVisible: boolean = false;

  password: FormControl = new FormControl("", {
    validators: [Validators.required, Validators.minLength(5)],
  });
  confirmPassword: FormControl = new FormControl("", {
    validators: [
      Validators.required,
      Validators.minLength(5),
      this.mustMatch(this.password),
    ],
  });

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    username: new FormControl("", {
      validators: [Validators.required, Validators.maxLength(15)],
    }),
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
    }),
    password: this.password,
  });

  override onSubmit$(): void {
    this.confirmPassword.markAsTouched();
    if (this.confirmPassword.valid) {
      subscribeOnce(this.authService.register(this.form.value), () =>
        this.router.navigate(["auth/login"])
      );
    }
  }
}

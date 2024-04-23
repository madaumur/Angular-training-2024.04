import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ErrorMessageComponent} from "../error-message/error-message.component";

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [ReactiveFormsModule, ErrorMessageComponent]
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  confirmPassword: FormControl = new FormControl('', {validators: [Validators.required, Validators.minLength(5)]});

  onSubmit(): void {
    if (this.form.valid) console.log('User:');
  }

  isInvalid(control: FormControl) {
    return (control.touched || control.dirty) && control.invalid
  }

  hasError(control: FormControl, errorCode: string) {
    return (control.touched || control.dirty) && control.hasError(errorCode)
  }
}

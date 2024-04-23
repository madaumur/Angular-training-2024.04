import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credential: { login: string; password: string } = {
    login: '',
    password: '',
  };

  onSubmit(isValid: boolean): void {
    if (isValid) console.log(' Infos: ' + JSON.stringify(this.credential));
  }
}

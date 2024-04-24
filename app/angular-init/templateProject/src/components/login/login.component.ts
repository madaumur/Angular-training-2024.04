import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ErrorMessageComponent } from "../error-message/error-message.component";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, ErrorMessageComponent],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  credential: { login: string; password: string } = {
    login: "",
    password: "",
  };

  onSubmit(isValid: boolean): void {
    if (isValid) console.log("Infos: " + JSON.stringify(this.credential));
  }
}

import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { Router } from "@angular/router";
import { subscribeOnce } from "../../tools/observable-helper";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, ErrorMessageComponent],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  constructor(
    private router: Router,
    protected authService: AuthService
  ) {}

  credentials: { email: string; password: string } = {
    email: "",
    password: "",
  };

  onSubmit(isValid: boolean): void {
    if (isValid) {
      subscribeOnce(this.authService.login(this.credentials), () =>
        this.router.navigate([""])
      );
    }
  }
}

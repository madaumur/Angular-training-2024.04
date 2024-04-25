import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { environment } from "../environments/environment";
import { BehaviorSubject, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authResponse: BehaviorSubject<AuthResponse | undefined> =
    new BehaviorSubject<AuthResponse | undefined>(undefined);

  get currentUser() {
    return this.authResponse.value?.user;
  }

  get token() {
    return this.authResponse.value?.accessToken;
  }

  get isLogged() {
    return !!this.authResponse.value;
  }

  readonly AUTH_KEY = "AUTH_RESPONSE";

  useLocal: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const existingResponse =
      sessionStorage.getItem(this.AUTH_KEY) ??
      localStorage.getItem(this.AUTH_KEY);

    if (existingResponse) this.authResponse.next(JSON.parse(existingResponse));

    this.authResponse.subscribe((response) => {
      if (response) {
        (this.useLocal ? localStorage : sessionStorage).setItem(
          this.AUTH_KEY,
          JSON.stringify(response)
        );
      } else {
        sessionStorage.clear();
        localStorage.clear();
        router.navigate(["/"]);
      }
    });
  }

  login(credentials: any) {
    return this.http
      .post<AuthResponse>(`${environment.API_URL}/login`, credentials)
      .pipe(tap((response) => this.authResponse.next(response)));
  }

  register(user: User) {
    return this.http.post<AuthResponse>(
      `${environment.API_URL}/register`,
      user
    );
  }

  logout() {
    this.authResponse.next(undefined);
  }
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export const authGuard = () => {
  inject(AuthService).isLogged ||
    inject(Router).createUrlTree(["/auth/login/"]);
};

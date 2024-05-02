import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthResponse } from './models/auth-response.model';
import { Credentials } from './models/credentials.model';
import { User } from './models/user.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // utilisé pour stocker le information de connexion
  private authResponse: BehaviorSubject<AuthResponse | undefined> =
    new BehaviorSubject<AuthResponse | undefined>(undefined);

  // clé pour le stockage dans le storage du navigateur
  readonly AUTH_KEY = 'AUTH_RESPONSE';

  constructor(private http: HttpClient, private router: Router) {
    // on cherche s'il y a des infos de connnexion dans le stockage du navigateur
    const existingResponse: string | null = localStorage.getItem(this.AUTH_KEY);

    // si oui, on les pousse dans notre behaviorSubject
    if (existingResponse) this.authResponse.next(JSON.parse(existingResponse));

    // on subscribe au behaviorSubject pour garder à jour le statut connecté
    this.authResponse.subscribe((response) => {
      if (response) {
        localStorage.setItem(this.AUTH_KEY, JSON.stringify(response));
      } else {
        sessionStorage.clear();
        localStorage.clear();
        router.navigate(['/']);
      }
    });
  }

  // getter sur l'utilisateur logged
  get currentUser(): User | undefined {
    return this.authResponse.value?.user;
  }

  // getter sur le token de l'utilisateur logged
  get token(): string | undefined {
    return this.authResponse.value?.accessToken;
  }

  // getter sur un booléen informant du statut connecté ou non
  get isLogged(): boolean {
    return !!this.authResponse.value;
  }

  // méthode de connexion => appel à l'API ./login
  // on pipe pour stocker les info de connexion dans notre behaviorSubject
  login(credentials: Credentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('/login', credentials)
      .pipe(tap((response) => this.authResponse.next(response)));
  }

  // méthode de création de compte => appel à l'API ./register
  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/register', user);
  }

  // méthode de deconnexion => on supprme les infos de authResponse
  logout(): void {
    this.authResponse.next(undefined);
  }
}

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class AbstractService<T> {
  abstract readonly ENDPOINT: string;

  constructor(protected http: HttpClient) {}

  all(): Observable<T[]> {
    return this.http.get<T[]>(this.ENDPOINT);
  }

  byId(id: number): Observable<T> {
    return this.http.get<T>(`${this.ENDPOINT}/${id}`);
  }

  save(object: T): Observable<T> {
    return this.http.post<T>(this.ENDPOINT, object);
  }

  //mise à jour complete de l'objet, on écrase tout et on recommence
  update(object: T): Observable<T> {
    return this.http.put<T>(`${this.ENDPOINT}/${object}`, object);
  }

  /* mise à jour partiel de l'objet, on change uniquement les champs renseignés

  partialUpdate(object: T): Observable<T> {
    return this.http.patch<T>(`${this.BASE_URL}/${object.id}`, object);
  }

  */

  // Force le cas error si on recoit quelque chose alors qu'on est sensé rien recevoir d'un delete
  delete(id: number): Observable<never> {
    return this.http.delete<never>(`${this.ENDPOINT}/${id}`);
  }
}

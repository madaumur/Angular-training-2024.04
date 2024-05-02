import { Injectable } from '@angular/core';
import { AbstractService } from '../common/services/abstract-service';
import { Project } from './project.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends AbstractService<Project> {
  readonly ENDPOINT: string = `/projects`;

  constructor(http: HttpClient) {
    super(http);
  }

  override update(object: Project): Observable<Project> {
    return this.http.put<Project>(`${this.ENDPOINT}/${object.id}`, object);
  }
}

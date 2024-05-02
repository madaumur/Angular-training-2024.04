import { Component } from '@angular/core';
import { ProjectComponent } from '../../components/project/project.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Project } from '../../project.model';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  imports: [ProjectComponent, AsyncPipe],
})
export class ProjectListComponent {
  data!: Observable<Project[]>;

  constructor(private projectService: ProjectService) {
    this.fetchAll();
  }

  fetchAll(): void {
    this.data = this.projectService.all();
  }
}

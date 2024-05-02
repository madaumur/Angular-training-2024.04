import { Router, RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Project } from '../../project.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  @Input({ required: true }) project!: Project;

  constructor(private router: Router) {}

  navigateToEditMode(id: number) {
    this.router.navigate([`/project/${id}`]);
  }
}

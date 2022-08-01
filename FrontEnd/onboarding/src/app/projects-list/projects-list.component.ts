import { Component, OnInit } from '@angular/core';
import { IProjects } from './IProjects';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  token: string | null | undefined;
  projects: IProjects[] = [];

  constructor(private projectsService : ProjectsService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    this.projectsService.getProjects(this.token).subscribe({
      next: (dataProjects: IProjects[]) => {
        this.projects = dataProjects;
      },
    });
  }

  }

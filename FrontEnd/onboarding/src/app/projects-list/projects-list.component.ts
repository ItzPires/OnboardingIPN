import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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

  constructor(private projectsService : ProjectsService, private cookies : CookieService) { }

  ngOnInit(): void {
    this.token = this.cookies.get('token');

    this.projectsService.getProjects(this.token).subscribe({
      next: (dataProjects: IProjects[]) => {
        this.projects = dataProjects;
      },
    });
  }

  }

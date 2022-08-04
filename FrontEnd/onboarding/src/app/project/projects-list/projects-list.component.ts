import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/user/guards/user.service';
import { States } from '../common/states';
import { ProjectsService } from '../projects.service';
import { IProjectsID } from './IProjectsID';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['../../common/styles.css']
})
export class ProjectsListComponent implements OnInit {
  token: string | null | undefined;
  roleUser: string | null | undefined;
  states = States;
  projects: IProjectsID[] = [];

  constructor(public projectsService: ProjectsService, private userService: UserService, public router: Router) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();

    this.projectsService.getProjectsGet(this.token).subscribe({
      next: (dataProjects: IProjectsID[]) => {
        this.projects = dataProjects;
      },
    });
  }

}

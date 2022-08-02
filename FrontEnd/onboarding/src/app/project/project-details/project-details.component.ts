import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { States } from '../common/states';
import { IProjectsID } from '../projects-list/IProjectsID';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['../../common/styles.css']
})
export class ProjectDetailsComponent implements OnInit {
  token: string | null | undefined;
  roleUser: string | null | undefined;
  states = States;
  project!: IProjectsID;

  constructor(private projectsService: ProjectsService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();

    this.projectsService.getProjectByIDGet(this.token, Number(this.route.snapshot.paramMap.get('id'))).subscribe({
      next: (dataProjects: IProjectsID) => {
        this.project = dataProjects;
      },
    });

  }

}

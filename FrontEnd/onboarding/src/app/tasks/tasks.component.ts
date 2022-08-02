import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IProjectsID } from '../project/projects-list/IProjectsID';
import { ProjectsService } from '../project/projects.service';
import { UserService } from '../user/user.service';
import { ITask } from './ITask';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['../common/styles.css']
})
export class TasksComponent implements OnInit {
  token: string | null | undefined;
  roleUser: string | null | undefined;
  newTask!: ITask;
  projects: IProjectsID[] = [];

  constructor(public projectsService: ProjectsService, private userService: UserService) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();

    this.projectsService.getProjectsGet(this.token).subscribe({
      next: (dataProjects: IProjectsID[]) => {
        this.projects = dataProjects;
      },
    });
  }

  onSubmit(form: NgForm) {
  }

}

import { Component, OnInit } from '@angular/core';
import { States } from '../project/common/states';
import { IProjectsID } from '../project/projects-list/IProjectsID';
import { ProjectsService } from '../project/projects.service';
import { ITask } from '../tasks/ITask';
import { TasksService } from '../tasks/tasks.service';
import { UserService } from '../user/guards/user.service';
import { IUsers } from './IUsers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../common/styles.css']
})
export class DashboardComponent implements OnInit {
  token: string | null | undefined;
  roleUser: string | null | undefined;
  states = States;
  projects: IProjectsID[] = [];
  programmers: IUsers[] = [];
  managers: IUsers[] = [];
  tasks: ITask[] = [];

  constructor(public projectsService: ProjectsService, private taskService: TasksService, private userService: UserService) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();

    if(this.roleUser === 'Manager') {
      this.projectsService.getProjectsGet(this.token).subscribe({
        next: (dataProjects: IProjectsID[]) => {
          this.projects = dataProjects;
        },
      });

      this.userService.getProgrammers().subscribe({
        next: (dataProgrammers: IUsers[]) => {
          this.programmers = dataProgrammers;
        },
      });

      this.userService.getManagers().subscribe({
        next: (dataManagers: IUsers[]) => {
          this.managers = dataManagers;
        },
      });

      this.taskService.getTasksGet().subscribe({
        next: (dataTasks: ITask[]) => {
          this.tasks = dataTasks;
        },
      });
    }
    else
    {
      this.taskService.getTasksByUser(this.token).subscribe({
        next: (dataTasks: ITask[]) => {
          this.tasks = dataTasks;
        },
      });
    }
  }

}

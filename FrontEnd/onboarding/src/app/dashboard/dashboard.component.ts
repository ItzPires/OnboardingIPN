import { Component, OnInit } from '@angular/core';
import { States } from '../project/common/states';
import { IProjectsID } from '../project/projects-list/IProjectsID';
import { ProjectsService } from '../project/projects.service';
import { ITask } from '../tasks/ITask';
import { TasksService } from '../tasks/tasks.service';
import { UserService } from '../user/user.service';
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
  errorProjects: boolean = false;
  errorProgrammers: boolean = false;
  errorManagers: boolean = false;
  errorTask: boolean = false;

  constructor(public projectsService: ProjectsService, private taskService: TasksService, private userService: UserService) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();

    if(this.roleUser === 'Manager') {
      this.projectsService.getProjectsGet(this.token).subscribe({
        next: (dataProjects: IProjectsID[]) => {
          this.projects = dataProjects;
        },
        error: () => {this.errorProjects = true;},
      });

      this.userService.getProgrammers().subscribe({
        next: (dataProgrammers: IUsers[]) => {
          this.programmers = dataProgrammers;
        },
        error: () => {this.errorProgrammers = true;},
      });

      this.userService.getManagers().subscribe({
        next: (dataManagers: IUsers[]) => {
          this.managers = dataManagers;
        },
        error: () => {this.errorManagers = true;},
      });

      this.taskService.getTasksGet().subscribe({
        next: (dataTasks: ITask[]) => {
          this.tasks = dataTasks;
        },
        error: () => {this.errorTask = true;},
      });
    }
    else
    {
      this.taskService.getMyTasks().subscribe({
        next: (dataTasks: ITask[]) => {
          this.tasks = dataTasks;
        },
        error: () => {this.errorTask = true;},
      });
    }
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { States } from '../project/common/states';
import { IProjectsID } from '../project/projects-list/IProjectsID';
import { ProjectsService } from '../project/projects.service';
import { ITask } from '../tasks/ITask';
import { TasksService } from '../tasks/tasks.service';
import { UserDetailsComponent } from '../user/user-details/user-details.component';
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

  constructor(public projectsService: ProjectsService, private taskService: TasksService, private userService: UserService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();

    if(this.roleUser === 'Manager') {
      this.projectsService.getProjects().subscribe({
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

      this.taskService.getTasks().subscribe({
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

  openDialogProgrammer(username: string): void {
    var dialog = this.dialog.open(UserDetailsComponent, {
      data: { user: username }
    });
  }

}

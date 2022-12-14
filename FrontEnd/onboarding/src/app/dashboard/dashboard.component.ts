import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Badges } from '../common/enums/Badges';
import { Cookies } from '../common/enums/Cookies';
import { IResponse } from '../common/Iresponse';
import { IStats } from '../common/IStats';
import { States } from '../common/enums/states';
import { IProjectsID } from '../project/projects-list/IProjectsID';
import { ProjectsService } from '../project/projects.service';
import { ITask } from '../tasks/ITask';
import { TasksDetailsComponent } from '../tasks/tasks-details/tasks-details.component';
import { TasksService } from '../tasks/tasks.service';
import { Roles } from '../user/Roles';
import { ProgrammerDetailsComponent } from '../user/programmer-details/programmer-details.component';
import { UserService } from '../user/user.service';
import { IUsers } from './IUsers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../common/styles.css']
})
export class DashboardComponent implements OnInit {
  token!: string;
  roleUser: string | null | undefined;
  states = States;
  projects: IProjectsID[] = [];
  programmers: IUsers[] = [];
  tasks: ITask[] = [];
  calendar: ITask[] = [];
  stats!: IStats;
  errorProjects: IResponse = {
    error: false,
    done: false,
    status: 0
  }
  errorProgrammers: IResponse = {
    error: false,
    done: false,
    status: 0
  }
  errorTask: IResponse = {
    error: false,
    done: false,
    status: 0
  }
  pageProject = 1;
  pageTask = 1;
  pageProgrammers = 1;
  pageSize = 3;
  Roles = Roles;
  Cookies = Cookies;
  Badges = Badges;

  constructor(public projectsService: ProjectsService, private taskService: TasksService, private userService: UserService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.token = this.userService.getCookie(Cookies.Token);
    this.roleUser = this.userService.getRole();

    if(this.roleUser === Roles.Manager) {

      this.projectsService.getProjects().subscribe({
        next: (dataProjects: IProjectsID[]) => {
          this.projects = dataProjects;
        },
        error: (error) => {
          this.errorProjects.error = true;
          this.errorProjects.status = error.status;
        },
        complete: () => { this.errorProjects.done = true; }
      });

      this.userService.getUsers(Roles.Programmer).subscribe({
        next: (dataProgrammers: IUsers[]) => {
          this.programmers = dataProgrammers;
        },
        error: (error) => {
          this.errorProgrammers.error = true;
          this.errorProgrammers.status = error.status;
        },
        complete: () => { this.errorProgrammers.done = true; }
      });

      this.getAllTasks();

      this.taskService.getCalendar().subscribe({
        next: (dataTasks: ITask[]) => {
          this.calendar = dataTasks;
        },
        error: (error) => {
        this.errorTask.error = true;
        this.errorTask.status = error.status;
      },
        complete: () => { this.errorTask.done = true; }
      });
    }
    else
    {
      this.getMyTasks();

      this.userService.getUserStats().subscribe({
        next: (dataStats: IStats) => {
          this.stats = dataStats;
        },
        error: (error) => {
        this.errorTask.error = true;
        this.errorTask.status = error.status;
      },
        complete: () => { this.errorTask.done = true; }
      });
    }
  }

  getAllTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (dataTasks: ITask[]) => {
        this.tasks = dataTasks;
      },
      error: (error) => {
        this.errorTask.error = true;
        this.errorTask.status = error.status;
      },
      complete: () => { this.errorTask.done = true; }
    });
  }

  getMyTasks(): void {
    this.taskService.getMyTasks().subscribe({
      next: (dataTasks: ITask[]) => {
        this.tasks = dataTasks;
      },
      error: (error) => {
        this.errorTask.error = true;
        this.errorTask.status = error.status;
      },
      complete: () => { this.errorTask.done = true; }
    });
  }

  openDialogProgrammer(username: string): void {
    var dialog = this.dialog.open(ProgrammerDetailsComponent, {
      data: { user: username }
    });
  }

  openDialogTask(id: number): void {
    var dialog = this.dialog.open(TasksDetailsComponent, {
      width: '600px',
      data: { id: id }
    });

    dialog.afterClosed().subscribe(
      data => {
        if(this.roleUser == Roles.Manager)
          this.getAllTasks();
        else
          this.getMyTasks();
    });
  }
}

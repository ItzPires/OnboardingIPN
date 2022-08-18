import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IStats } from '../common/IStats';
import { States } from '../project/common/states';
import { IProjectsID } from '../project/projects-list/IProjectsID';
import { ProjectsService } from '../project/projects.service';
import { ITask } from '../tasks/ITask';
import { TasksDetailsComponent } from '../tasks/tasks-details/tasks-details.component';
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
  token!: string;
  roleUser: string | null | undefined;
  states = States;
  projects: IProjectsID[] = [];
  programmers: IUsers[] = [];
  tasks: ITask[] = [];
  calendar: ITask[] = [];
  stats!: IStats;
  errorProjects: boolean = false;
  errorProgrammers: boolean = false;
  errorTask: boolean = false;

  constructor(public projectsService: ProjectsService, private taskService: TasksService, private userService: UserService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();

    if(this.roleUser === 'Manager') {
      while(this.token === undefined || this.token === null) {} //garanti que o token esteja definido - n muito correcto

      this.projectsService.getProjects().subscribe({
        next: (dataProjects: IProjectsID[]) => {
          this.projects = dataProjects;
        },
        error: () => {this.errorProjects = true;},
      });

      this.userService.getProgrammers(this.token).subscribe({
        next: (dataProgrammers: IUsers[]) => {
          this.programmers = dataProgrammers;
        },
        error: () => {this.errorProgrammers = true;},
      });

      this.getAllTasks();

      this.taskService.getCalendar().subscribe({
        next: (dataTasks: ITask[]) => {
          this.calendar = dataTasks;
        },
        error: () => {this.errorTask = true;},
      });
    }
    else
    {
      this.getMyTasks();

      this.userService.getUserStats().subscribe({
        next: (dataStats: IStats) => {
          this.stats = dataStats;
        },
        error: () => {this.errorTask = true;},
      });
    }
  }

  getAllTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (dataTasks: ITask[]) => {
        this.tasks = dataTasks;
      },
      error: () => {this.errorTask = true;},
    });
  }

  getMyTasks(): void {
    this.taskService.getMyTasks(this.token).subscribe({
      next: (dataTasks: ITask[]) => {
        this.tasks = dataTasks;
      },
      error: () => {this.errorTask = true;},
    });
  }

  openDialogProgrammer(username: string): void {
    var dialog = this.dialog.open(UserDetailsComponent, {
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
        if(this.roleUser == 'Manager')
          this.getAllTasks();
        else
          this.getMyTasks();
    });
  }
}

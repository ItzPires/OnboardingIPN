import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cookies } from 'src/app/common/enums/Cookies';
import { IUsers } from 'src/app/dashboard/IUsers';
import { ProjectNewComponent } from 'src/app/project/project-new/project-new.component';
import { IProjectsID } from 'src/app/project/projects-list/IProjectsID';
import { ProjectsService } from 'src/app/project/projects.service';
import { Roles } from 'src/app/user/Roles';
import { UserService } from 'src/app/user/user.service';
import { TasksService } from '../tasks.service';
import { ITaskForm } from './ITaskForm';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-new.component.html',
  styleUrls: ['../../common/styles.css']
})
export class TasksNewComponent implements OnInit {
  token!: string;
  roleUser: string | null | undefined;
  newTask: ITaskForm = {
    name: '',
    deadline: new Date(),
    state: 0,
    idProject: -1,
    usernameProgrammer: ''

  }
  projects: IProjectsID[] = [];
  programmers: IUsers[] = [];

  Cookies = Cookies;

  constructor(public dialogRef: MatDialogRef<ProjectNewComponent>, public projectsService: ProjectsService, private taskService: TasksService, private userService: UserService) { }

  ngOnInit(): void {
    this.token = this.userService.getCookie(Cookies.Token);
    this.roleUser = this.userService.getRole();

    this.projectsService.getProjects().subscribe({
      next: (dataProjects: IProjectsID[]) => {
        this.projects = dataProjects;
      },
    });

    this.userService.getUsers(Roles.Programmer).subscribe({
      next: (dataProgrammers: IUsers[]) => {
        this.programmers = dataProgrammers;
      },
      error: () => {console.log('error')},
    });
  }

  onSubmit() {
      this.newTask.state = 0;
      this.taskService.newTask(this.newTask).subscribe(
        {
          error: (error) => console.log(error),
          complete: () => { this.dialogRef.close(); }
        }
      );
  }
}

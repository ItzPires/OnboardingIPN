import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/dashboard/IUsers';
import { ProjectComponent } from 'src/app/project/project/project.component';
import { IProjectsID } from 'src/app/project/projects-list/IProjectsID';
import { ProjectsService } from 'src/app/project/projects.service';
import { UserService } from 'src/app/user/user.service';
import { TasksService } from '../tasks.service';
import { ITaskForm } from './ITaskForm';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-new.component.html',
  styleUrls: ['../../common/styles.css']
})
export class TasksNewComponent implements OnInit {
  token: string | null | undefined;
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

  constructor(public dialogRef: MatDialogRef<ProjectComponent>, public projectsService: ProjectsService, private taskService: TasksService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();

    this.projectsService.getProjects().subscribe({
      next: (dataProjects: IProjectsID[]) => {
        this.projects = dataProjects;
      },
    });

    this.userService.getProgrammers().subscribe({
      next: (dataProgrammers: IUsers[]) => {
        this.programmers = dataProgrammers;
      },
    });
  }

  onSubmit() {
    console.log(this.newTask);
      this.newTask.state = 0;
      this.taskService.newTask(this.newTask).subscribe(
        {
          error: (error) => console.log(error),
          complete: () => {    this.dialogRef.close(); }
        }
      );
  }
}

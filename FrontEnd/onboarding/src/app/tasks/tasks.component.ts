import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUsers } from '../dashboard/IUsers';
import { IProjectsID } from '../project/projects-list/IProjectsID';
import { ProjectsService } from '../project/projects.service';
import { UserService } from '../user/user.service';
import { ITask } from './ITask';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['../common/styles.css']
})
export class TasksComponent implements OnInit {
  token: string | null | undefined;
  roleUser: string | null | undefined;
  newTask: ITask = {
    name: '',
    idProject: -1,
    usernameProgrammer: '',
    state: '',
    deadline: new Date()
  }
  projects: IProjectsID[] = [];
  programmers: IUsers[] = [];

  constructor(public projectsService: ProjectsService, private taskService: TasksService, private userService: UserService) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();

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
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.newTask.state = 'New';
      this.taskService.newTask(this.newTask);
     }
  }
}

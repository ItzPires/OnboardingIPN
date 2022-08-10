import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUsers } from 'src/app/dashboard/IUsers';
import { IProjectsID } from 'src/app/project/projects-list/IProjectsID';
import { ProjectsService } from 'src/app/project/projects.service';
import { UserService } from 'src/app/user/user.service';
import { ITask } from '../ITask';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-new.component.html',
  styleUrls: ['../../common/styles.css']
})
export class TasksNewComponent implements OnInit {
  token: string | null | undefined;
  roleUser: string | null | undefined;
  newTask: ITask = {
    id: -1,
    name: '',
    state: -1,
    project: {} as IProjectsID,
    programmer: {} as IUsers,
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
      this.newTask.state = -1;
      this.taskService.newTask(this.newTask);
     }
  }
}

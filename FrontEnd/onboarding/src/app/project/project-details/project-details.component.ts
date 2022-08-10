import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ITask } from 'src/app/tasks/ITask';
import { TasksService } from 'src/app/tasks/tasks.service';
import { UserService } from 'src/app/user/user.service';
import { States } from '../common/states';
import { IProjectsID } from '../projects-list/IProjectsID';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['../../common/styles.css']
})
export class ProjectDetailsComponent implements OnInit {
  token: string | null | undefined;
  roleUser: string | null | undefined;
  statesProject = States;
  statesProjectKeys = Object.keys(States).filter((k) => !isNaN(Number(k))).map(Number);
  project!: IProjectsID;
  tasks: ITask[] = [];

  constructor(private projectsService: ProjectsService, private userService: UserService, private taskService: TasksService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();

    this.projectsService.getProjectByIDGet(this.token, Number(this.route.snapshot.paramMap.get('id'))).subscribe({
      next: (dataProjects: IProjectsID) => {
        this.project = dataProjects;
      },
    });

    this.taskService.getTasksByProject(this.token, Number(this.route.snapshot.paramMap.get('id'))).subscribe({
      next: (dataTasks: ITask[]) => {
        this.tasks = dataTasks;
      },
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.project.state = Number(this.project.state);
      this.projectsService.updateProjectPut(Number(this.route.snapshot.paramMap.get('id')), this.project).subscribe(
        {
          error: (error) => console.log(error),
          complete: () => this.router.navigate(['projects'])
        }
      );
    }
  }
}

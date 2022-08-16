import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from 'src/app/tasks/ITask';
import { TasksDeleteComponent } from 'src/app/tasks/tasks-delete/tasks-delete.component';
import { TasksDetailsComponent } from 'src/app/tasks/tasks-details/tasks-details.component';
import { TasksNewComponent } from 'src/app/tasks/tasks-new/tasks-new.component';
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
  idProject!: number;
  statesProject = States;
  statesProjectKeys = Object.keys(States).filter((k) => !isNaN(Number(k))).map(Number);
  project!: IProjectsID;
  tasks: ITask[] = [];
  originalTasks: ITask[] = [];
  totalTasks!: number;
  page: number = 1;
  numberPages!: number;
  tasksPerPage!: number;
  searchString: string = '';

  constructor(private projectsService: ProjectsService, private userService: UserService, private taskService: TasksService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();
    this.idProject = Number(this.route.snapshot.paramMap.get('id'));

    this.getProject();

    this.getTask();

  }

  private getProject()
  {
    this.projectsService.getProjectByID(this.idProject).subscribe({
      next: (dataProjects: IProjectsID) => {
        this.project = dataProjects;
      },
    });
  }

  private getTask()
  {
    this.taskService.getTasksByProject(this.idProject).subscribe({
      next: (dataTasks: ITask[]) => {
        this.tasks = dataTasks;
        this.totalTasks = this.tasks.length;
        this.originalTasks = this.tasks;
      },
    });
  }

  onSubmit(form: NgForm) {
  console.log("certo");
    if (form.valid) {
      this.project.state = Number(this.project.state);
      this.projectsService.updateProject(Number(this.route.snapshot.paramMap.get('id')), this.project).subscribe(
        {
          error: (error) => console.log(error),
          complete: () => this.router.navigate(['projects'])
        }
      );
    }
  }

  openDialogNewTask(): void {
    var dialog = this.dialog.open(TasksNewComponent, {
      width: '600px',
    });
    dialog.afterClosed().subscribe(
      data => { this.getTask(); }
    );
  }

  onDelete(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      }
    });
  }


  openDialogDeleteTask(taskName: string, id: number): void {
    var dialog = this.dialog.open(TasksDeleteComponent, {
      width: '250px',
      data: {
        taskName: taskName,
        id: id
      }
    });
    dialog.afterClosed().subscribe(
      data => { if (data) { this.onDelete(id); } }
    );
  }

  openDialogTask(id: number): void {
    var dialog = this.dialog.open(TasksDetailsComponent, {
      data: { id: id }
    });
    dialog.afterClosed().subscribe(
      data => { this.getTask(); }
    );
  }

  counter(i: number) {
    return new Array(i);
  }

  onSearch(search: string): void {
    search = search.toLowerCase();
    this.tasks = this.originalTasks.filter(task => task.name.toLowerCase().includes(search) || task.programmer.userName.toLowerCase().includes(search) || task.project.name.toLowerCase().includes(search));
  }

}

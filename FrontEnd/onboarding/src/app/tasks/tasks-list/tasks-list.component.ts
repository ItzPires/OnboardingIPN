import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/user/user.service';
import { ITask } from '../ITask';
import { TasksDeleteComponent } from '../tasks-delete/tasks-delete.component';
import { TasksDetailsComponent } from '../tasks-details/tasks-details.component';
import { TasksNewComponent } from '../tasks-new/tasks-new.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['../../common/styles.css']
})
export class TasksListComponent implements OnInit {
  tasks: ITask[] = [];
  roleUser = '';
  errorTask: boolean = false;
  originalTasks: ITask[] = [];
  searchString: string = '';
  page = 1;
  pageSize = 5;

  constructor(private taskService: TasksService, private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.roleUser = this.userService.getRole();

    if(this.roleUser == 'Manager') {
      this.getAllTasks();
    }
    else
    {
      this.getMyTasks();
    }

  }

  private getAllTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (dataTasks: ITask[]) => {
        this.tasks = dataTasks;
        this.originalTasks = this.tasks;
      },
      error: () => {this.errorTask = true;},
    });
  }

  private getMyTasks(): void {
    this.taskService.getMyTasks(this.userService.getToken()).subscribe({
      next: (dataTasks: ITask[]) => {
        this.tasks = dataTasks;
        this.originalTasks = this.tasks;
      },
      error: () => {this.errorTask = true;},
    });
  }

  onDelete(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      }
    });
  }


  openDialog(taskName: string, id: number): void {
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
      width: '600px',
      data: { id: id }
    });
    dialog.afterClosed().subscribe(
      data => {
        if(this.roleUser == 'Manager')
          this.getAllTasks();
        else
          this.getMyTasks();
        }
    );
  }

  newTask(): void {
    var dialog = this.dialog.open(TasksNewComponent, {
      width: '600px'
    });

    dialog.afterClosed().subscribe(() => {
      this.taskService.getTasks().subscribe({
        next: (dataProjects: ITask[]) => {
          this.tasks = dataProjects;
        },
        error: () => { this.errorTask = true; },
      });
    })
  }

  onSearch(search: string): void {
    search = search.toLowerCase();
    this.tasks = this.originalTasks.filter(task => task.name.toLowerCase().includes(search) || task.project.name.toLowerCase().includes(search));
  }

}

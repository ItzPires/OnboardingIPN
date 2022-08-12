import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/user/user.service';
import { ITask } from '../ITask';
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

  constructor(private taskService: TasksService, private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.roleUser = this.userService.getRole();

    if(this.roleUser == 'Manager') {
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

  onDelete(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      }
    });
  }


  openDialog(taskName: string, id: number): void {
    var dialog = this.dialog.open(DeleteTaskDialog, {
      width: '250px',
      data: {
        projectName: taskName,
        id: id
      }
    });
    dialog.afterClosed().subscribe(
      data => { if (data) { this.onDelete(id); } }
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

}


@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'deleteDialog.html',
})
export class DeleteTaskDialog {
  constructor(public dialogRef: MatDialogRef<DeleteTaskDialog>, @Inject(MAT_DIALOG_DATA) public data: { taskName: string, id: number }) { }

  close(bool: boolean): void {
    this.dialogRef.close(bool);
  }
}

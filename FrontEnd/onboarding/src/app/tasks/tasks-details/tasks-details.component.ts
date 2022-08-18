import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { States } from 'src/app/project/common/states';
import { UserService } from 'src/app/user/user.service';
import { IComment } from '../IComment';
import { ITask } from '../ITask';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-details',
  templateUrl: './tasks-details.component.html',
  styleUrls: ['../../common/styles.css']
})
export class TasksDetailsComponent {
  task!: ITask;
  comments: IComment[] = [];
  userRole: string | null | undefined;
  statesTask = States;
  statesTaskKeys = Object.keys(States).filter((k) => !isNaN(Number(k))).map(Number);

  constructor(public dialogRef: MatDialogRef<TasksDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: { id: number }, private taskSerive: TasksService, private router: Router, private userService: UserService, private route: ActivatedRoute)
  {
    this.taskSerive.getTaskByID(data.id).subscribe({
      next: (dataTask: ITask) => {
        this.task = dataTask;
      },
    });

    this.taskSerive.getCommentsByTask(data.id).subscribe({
      next: (dataComments: IComment[]) => {
        this.comments = dataComments;
      }
    });

    this.userRole = this.userService.getRole();

  }

  onSubmit(form: NgForm) {
    this.task.state = Number(this.task.state);
    if (form.valid) {
      this.taskSerive.updateTask(this.data.id, this.task).subscribe(
        {
          error: (error) => console.log(error),
          complete: () => {this.dialogRef.close(); }
        }
      );
    }
  }
}

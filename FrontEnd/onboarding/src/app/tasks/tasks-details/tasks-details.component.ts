import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { States } from 'src/app/project/common/states';
import { CommentsService } from 'src/app/shared/comments.service';
import { Roles } from 'src/app/user/Roles';
import { UserService } from 'src/app/user/user.service';
import { IComment } from '../IComment';
import { ICommentUserString } from '../ICommentUserString';
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
  newComments: ICommentUserString = {
    content: '',
    date: new Date(),
    taskId: 0,
    WriterUserName: ''
  };
  userRole: string | null | undefined;
  statesTask = States;
  statesTaskKeys = Object.keys(States).filter((k) => !isNaN(Number(k))).map(Number);
  Roles = Roles;

  constructor(public dialogRef: MatDialogRef<TasksDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: { id: number }, private taskSerive: TasksService, private commentsService: CommentsService, private userService: UserService)
  {
    this.taskSerive.getTaskByID(data.id).subscribe({
      next: (dataTask: ITask) => {
        this.task = dataTask;
      },
    });

    this.commentsService.getCommentsByTask(data.id).subscribe({
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

  comment(form: NgForm) {
    this.newComments.WriterUserName = this.userService.getMyUsername();
    this.newComments.date = new Date();
    this.newComments.taskId = this.data.id;

    if (form.valid) {
      this.commentsService.newCommentary(this.newComments).subscribe(
        {
          error: (error) => console.log(error),
          complete: () => { this.dialogRef.close(); }
        }
      );
    }
  }
}

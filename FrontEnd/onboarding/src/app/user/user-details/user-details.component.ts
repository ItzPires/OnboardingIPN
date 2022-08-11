import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IUsers } from 'src/app/dashboard/IUsers';
import { ITask } from 'src/app/tasks/ITask';
import { TasksService } from 'src/app/tasks/tasks.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-programmer-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['../../common/styles.css']
})
export class UserDetailsComponent {
  userName: string = "";
  userRole!: string | null;
  userInfo!: IUsers;
  tasks: ITask[] = [];

  constructor(public dialogRef: MatDialogRef<UserDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: { user: string }, private userService: UserService, private taskService: TasksService)
  {
    this.userName = data.user;

    this.userService.getUserDetails(this.userName).subscribe(
      {
        next: (value: IUsers) => { this.userInfo = value; },
        error: () => { console.log("error"); }
      });

    this.taskService.getTasksByUser(this.userName).subscribe(
      {
        next: (value: ITask[]) => { this.tasks = value; },
        error: () => { console.log("error"); }
      });
    }
  }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUsers } from 'src/app/dashboard/IUsers';
import { ITask } from 'src/app/tasks/ITask';
import { TasksService } from 'src/app/tasks/tasks.service';
import { UserService } from '../guards/user.service';

@Component({
  selector: 'app-programmer-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['../../common/styles.css']
})
export class UserDetailsComponent implements OnInit {
  userName: string = "";
  userRole!: string | null;
  userInfo!: IUsers;
  tasks: ITask[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService, private taskService: TasksService) { }

  ngOnInit(): void {
    var userIsNull = this.route.snapshot.paramMap.get('username');

    if (userIsNull != null) {
      this.userName = userIsNull;
    }

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

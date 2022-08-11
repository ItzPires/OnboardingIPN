import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { ITask } from '../ITask';
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

  constructor(private taskService: TasksService, private userService: UserService) { }

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

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/guards/user.service';
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

  constructor(private taskService: TasksService, private userService: UserService) { }

  ngOnInit(): void {
    this.roleUser = this.userService.getRole();

    if(this.roleUser == 'Manager') {
      this.taskService.getTasksGet().subscribe({
        next: (dataTasks: ITask[]) => {
          this.tasks = dataTasks;
        },
      });
    }
    else
    {
      this.taskService.getTasksByUser(this.userService.getToken()).subscribe({
        next: (dataTasks: ITask[]) => {
          this.tasks = dataTasks;
        },
      });
    }

  }

}

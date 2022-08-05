import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../ITask';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-details',
  templateUrl: './tasks-details.component.html',
  styleUrls: ['../../common/styles.css']
})
export class TasksDetailsComponent implements OnInit {
  task!: ITask;

  constructor(private taskSerive: TasksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskSerive.getTaskByID(Number(this.route.snapshot.paramMap.get('id'))).subscribe({
      next: (dataTask: ITask) => {
        this.task = dataTask;
      },
    });
  }

  onSubmit(form: NgForm) {
  }
}

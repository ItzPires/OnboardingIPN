import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { States } from 'src/app/project/common/states';
import { ITask } from '../ITask';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-details',
  templateUrl: './tasks-details.component.html',
  styleUrls: ['../../common/styles.css']
})
export class TasksDetailsComponent implements OnInit {
  task!: ITask;
  statesTask = States;
  statesTaskKeys = Object.keys(States).filter((k) => !isNaN(Number(k))).map(Number);

  constructor(private taskSerive: TasksService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskSerive.getTaskByID(Number(this.route.snapshot.paramMap.get('id'))).subscribe({
      next: (dataTask: ITask) => {
        this.task = dataTask;
      },
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.taskSerive.updateTask(Number(this.route.snapshot.paramMap.get('id')), this.task).subscribe(
        {
          error: (error) => console.log(error),
          complete: () => this.router.navigate(['tasks'])
        }
      );
    }
  }
}

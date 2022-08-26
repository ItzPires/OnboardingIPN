import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IProjects } from '../common/IProjects';
import { States } from '../../common/enums/states';
import { ProjectsService } from '../projects.service';
import { IResponse } from 'src/app/common/Iresponse';

@Component({
  selector: 'app-project',
  templateUrl: './project-new.component.html',
  styleUrls: ['../../common/styles.css']
})
export class ProjectNewComponent {
  statesProject = States;
  statesProjectKeys = Object.keys(States).filter((k) => !isNaN(Number(k))).map(Number);
  newProject: IProjects = {
    name: '',
    budget: 0,
    state: 0
  };
  errorMsg: IResponse = {
    error: false,
    done: false,
    status: 0
  }

  constructor(public dialogRef: MatDialogRef<ProjectNewComponent>, private projectService: ProjectsService) { }

  onSubmit(form: NgForm) {
    this.errorMsg = {
      error: false,
      done: false,
      status: 0
    };

    if (form.valid) {
      this.newProject.state = Number(this.newProject.state);
      this.projectService.newProject(this.newProject).subscribe(
        {
          error: (error) => {
            this.errorMsg.error = true;
            this.errorMsg.status = error.status;
          },
          complete: () => {
            this.errorMsg.done = true;
            this.dialogRef.close();
          }
        }
      );
    }
  }
}

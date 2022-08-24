import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IProjects } from '../common/IProjects';
import { States } from '../../common/enums/states';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
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
  errorMsg: string = "";

  constructor(public dialogRef: MatDialogRef<ProjectNewComponent>, private projectService: ProjectsService) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.newProject.state = Number(this.newProject.state);
      this.projectService.newProject(this.newProject).subscribe(
        {
          error: (error) => {
            if (error.status === 0) this.errorMsg = "serverDown";
            else if (error.status === 401) this.errorMsg = "invalideUsername";
            else this.errorMsg = "error";
          },
          complete: () => {    this.dialogRef.close(); }
        }
      );
    }
  }
}

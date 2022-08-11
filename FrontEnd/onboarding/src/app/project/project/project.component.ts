import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IProjects } from '../common/IProjects';
import { States } from '../common/states';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['../../common/styles.css']
})
export class ProjectComponent {
  statesProject = States;
  statesProjectKeys = Object.keys(States).filter((k) => !isNaN(Number(k))).map(Number);
  newProject: IProjects = {
    name: '',
    budget: 0,
    state: 0
  };

  constructor(public dialogRef: MatDialogRef<ProjectComponent>, private projectService: ProjectsService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.newProject.state = Number(this.newProject.state);
      this.projectService.newProject(this.newProject).subscribe(
        {
          error: (error) => console.log(error)
        }
      );
    }
    this.dialogRef.close();
  }
}

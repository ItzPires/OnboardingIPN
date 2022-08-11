import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { States } from '../common/states';
import { ProjectsService } from '../projects.service';
import { IProjectsID } from './IProjectsID';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectComponent } from '../project/project.component';
@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['../../common/styles.css']
})
export class ProjectsListComponent implements OnInit {
  token: string | null | undefined;
  roleUser: string | null | undefined;
  states = States;
  projects: IProjectsID[] = [];
  errorProjects: boolean = false;

  constructor(public projectsService: ProjectsService, private userService: UserService, public router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.roleUser = this.userService.getRole();

    this.projectsService.getProjects().subscribe({
      next: (dataProjects: IProjectsID[]) => {
        this.projects = dataProjects;
      },
      error: () => { this.errorProjects = true; },
    });
  }

  onDelete(id: number): void {
    this.projectsService.deleteProject(id).subscribe({
      next: () => {
        this.projects = this.projects.filter(project => project.id !== id);
      }
    });
  }

  /*
  clickMethod(name: string) {
    if(confirm("Are you sure to delete "+name)) {
      console.log("Implement delete functionality here");
    }
  }*/

  openDialog(projectName: string, id: number): void {
    var dialog = this.dialog.open(DeleteProjectDialog, {
      width: '250px',
      data: {
        projectName: projectName,
        id: id
      }
    });
    dialog.afterClosed().subscribe(
      data => { if (data) { this.onDelete(id); } }
    );
  }

  newProject(): void {
    var dialog = this.dialog.open(ProjectComponent, {
      width: '600px'
    });

    dialog.afterClosed().subscribe(() => {
      this.projectsService.getProjects().subscribe({
        next: (dataProjects: IProjectsID[]) => {
          this.projects = dataProjects;
        },
        error: () => { this.errorProjects = true; },
      });
    })
  }

}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'deleteDialog.html',
})
export class DeleteProjectDialog {
  constructor(public dialogRef: MatDialogRef<DeleteProjectDialog>, @Inject(MAT_DIALOG_DATA) public data: { projectName: string, id: number }) { }

  close(bool: boolean): void {
    this.dialogRef.close(bool);
  }
}

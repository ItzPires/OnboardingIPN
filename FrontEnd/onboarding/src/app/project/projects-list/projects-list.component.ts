import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { States } from '../common/states';
import { ProjectsService } from '../projects.service';
import { IProjectsID } from './IProjectsID';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  openDialog(id: number): void {
    var di = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: { id: id }
    });
    di.afterClosed().subscribe(
      data => { if (data) { this.onDelete(id); } }
    );
  }

}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'deleteDialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: { id: number }, public projectsService: ProjectsService) { }

  close(bool: boolean): void {
    this.dialogRef.close(bool);
  }
}

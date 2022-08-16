import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html'
})
export class ProjectDeleteComponent {

  constructor(public dialogRef: MatDialogRef<ProjectDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: { projectName: string, id: number }) { }

  close(bool: boolean): void {
    this.dialogRef.close(bool);
  }
}

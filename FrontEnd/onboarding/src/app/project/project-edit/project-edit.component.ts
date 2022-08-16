import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html'
})
export class ProjectEditComponent {

  constructor(public dialogRef: MatDialogRef<ProjectEditComponent>, @Inject(MAT_DIALOG_DATA) public data: { projectName: string, id: number }) { }

  close(bool: boolean): void {
    this.dialogRef.close(bool);
  }

}

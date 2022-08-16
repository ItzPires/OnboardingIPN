import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks-delete',
  templateUrl: './tasks-delete.component.html'
})
export class TasksDeleteComponent {

  constructor(public dialogRef: MatDialogRef<TasksDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: { taskName: string, id: number }) { }

  close(bool: boolean): void {
    this.dialogRef.close(bool);
  }

}

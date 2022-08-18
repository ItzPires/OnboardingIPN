import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksDeleteComponent } from './tasks-delete/tasks-delete.component';
import { TasksDetailsComponent } from './tasks-details/tasks-details.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksNewComponent } from './tasks-new/tasks-new.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    TasksNewComponent,
    TasksListComponent,
    TasksDetailsComponent,
    TasksDeleteComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatDialogModule,
    TranslateModule
  ],
  exports: [
    TasksNewComponent,
    TasksListComponent,
    TasksDetailsComponent,
    TasksDeleteComponent,
  ]
})
export class TasksModule { }

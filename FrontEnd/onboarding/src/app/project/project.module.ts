import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ProjectDeleteComponent } from './project-delete/project-delete.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';


import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectsService } from './projects.service';

@NgModule({
  declarations: [
    ProjectDeleteComponent,
    ProjectEditComponent,
    ProjectDetailsComponent,
    ProjectsListComponent,
    ProjectNewComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [
    ProjectDeleteComponent,
    ProjectEditComponent,
    ProjectDetailsComponent,
    ProjectsListComponent,
    ProjectNewComponent,
  ],
  providers: [
    ProjectsService
  ],
})
export class ProjectModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

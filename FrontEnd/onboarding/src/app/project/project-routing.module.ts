import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsListComponent
  },
  {
    path: ':id',
    //canActivate: [AuthGuard, TaskGuard, ProjectDetailsGuard],
    component: ProjectDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProjectsListComponent } from './project/projects-list/projects-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component'
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { ProjectDetailsGuard } from './project/project-details/project-details.guard';
import { TaskGuard } from './tasks/tasks-new/task.guard';
import { UserGuard } from './user/guards/user.guard';
import { AuthGuard } from './user/guards/auth.guard';
import { ErrorComponent } from './error/error.component';
import { AboutComponent } from './welcome/about/about.component';
import { PricesComponent } from './welcome/prices/prices.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [UserGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [UserGuard],
    component: RegisterComponent
  },
  {
    path: 'projects',
    canActivate: [AuthGuard, TaskGuard],
    loadChildren: () =>import('./project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    component: TasksListComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'about',
    canActivate: [UserGuard],
    component: AboutComponent
  },
  {
    path: 'prices',
    canActivate: [UserGuard],
    component: PricesComponent
  },
  {
    path: '',
    canActivate: [UserGuard],
    component: WelcomeComponent
  },
  {
    path: '**',
    canActivate: [UserGuard],
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

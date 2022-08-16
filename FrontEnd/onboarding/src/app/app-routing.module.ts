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
    component: ProjectsListComponent
  },
  {
    path: 'projects/:id',
    canActivate: [AuthGuard, TaskGuard, ProjectDetailsGuard],
    component: ProjectDetailsComponent
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
  /*
  {
    path: 'user/programmer/:username',
    canActivate: [AuthGuard, TaskGuard],
    component: UserDetailsComponent
  },*/
  {
    path: '',
    canActivate: [UserGuard],
    component: WelcomeComponent
  },
  {
    path: '**',
    canActivate: [UserGuard],
    component: WelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

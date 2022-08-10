import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProjectsListComponent } from './project/projects-list/projects-list.component';
import { CookieService } from 'ngx-cookie-service';
import { ProjectComponent } from './project/project/project.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { TasksNewComponent } from './tasks/tasks-new/tasks-new.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { ProjectDetailsGuard } from './project/project-details/project-details.guard';
import { TaskGuard } from './tasks/tasks-new/task.guard';
import { UserGuard } from './user/guards/user.guard';
import { AuthGuard } from './user/guards/auth.guard';
import { TasksDetailsComponent } from './tasks/tasks-details/tasks-details.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    ProjectsListComponent,
    ProjectComponent,
    DashboardComponent,
    ProjectDetailsComponent,
    TasksNewComponent,
    NavbarComponent,
    TasksListComponent,
    TasksDetailsComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
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
        path: 'tasks',
        canActivate: [AuthGuard],
        component: TasksListComponent
      },
      {
        path: 'tasks/:id',
        canActivate: [AuthGuard],
        component: TasksDetailsComponent
      },
      {
        path: 'newTasks',
        canActivate: [AuthGuard, TaskGuard],
        component: TasksNewComponent
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
      },
      {
        path: 'projects/:id',
        canActivate: [AuthGuard, TaskGuard, ProjectDetailsGuard],
        component: ProjectDetailsComponent
      },
      {
        path: 'newProjects',
        canActivate: [AuthGuard, TaskGuard],
        component: ProjectComponent
      },
      {
        path: 'user/programmer/:username',
        canActivate: [AuthGuard, TaskGuard],
        component: UserDetailsComponent
      },
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
    ]),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

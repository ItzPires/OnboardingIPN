import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
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
import { TasksDetailsComponent } from './tasks/tasks-details/tasks-details.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

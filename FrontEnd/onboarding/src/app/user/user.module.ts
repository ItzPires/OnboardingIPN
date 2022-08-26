import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgrammerDetailsComponent } from './programmer-details/programmer-details.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProgrammerDetailsComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProgrammerDetailsComponent,
    ProfileComponent,
  ]
})
export class UserModule { }

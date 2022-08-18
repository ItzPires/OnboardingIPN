import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {MatNativeDateModule} from '@angular/material/core';
import { MaterialModule } from 'src/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    TranslateModule,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class SharedModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

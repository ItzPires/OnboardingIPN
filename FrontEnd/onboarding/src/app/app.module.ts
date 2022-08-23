import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { ErrorComponent } from './error/error.component';
import { AboutComponent } from './welcome/about/about.component';
import { PricesComponent } from './welcome/prices/prices.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    AboutComponent,
    PricesComponent,
    ErrorComponent
  ],
  imports: [
    TasksModule,
    UserModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDatepickerModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

import { Component } from '@angular/core';
import { LoginComponent } from './user/login/login.component';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onboarding';
  userRole = '';

  constructor () {}

  ngOnInit()
  {
    const sessionToken = localStorage.getItem('token') || '';

    //const decodedToken = this.jwtHelper.decodeToken(sessionToken);

    //this.userRole =  decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }
}

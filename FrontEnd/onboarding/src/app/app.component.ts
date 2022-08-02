import { Component } from '@angular/core';
import { LoginComponent } from './user/login/login.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onboarding';
  userRole = '';

  constructor (private userService : UserService) {}

  ngOnInit()
  {
    const token = this.userService.getToken() || '';
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(token);

    if(helper.isTokenExpired(token))
    {
      this.logout();
      return;
    }

    this.userRole =  decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  logout()
  {
    this.userService.logout();
    this.userRole = '';
  }
}

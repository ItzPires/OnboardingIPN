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
    this.userRole =  this.userService.getRole();
  }

  logout()
  {
    this.userService.logout();
    this.userRole = '';
  }
}

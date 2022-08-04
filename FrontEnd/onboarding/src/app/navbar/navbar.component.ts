import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/guards/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/guards/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole: string | undefined;

  constructor (private userService : UserService, private router: Router) {}

  ngOnInit()
  {
    this.userRole =  this.userService.getRole();
  }

  logout()
  {
    this.userService.logout();
    this.userRole = undefined;
    this.router.navigate(['/']);
  }

}

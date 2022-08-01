import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from '../common/IUser';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../common/form.component.css']
})

export class LoginComponent implements OnInit {
  user: IUser = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.loginUser(this.user);;
     }
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { IUserRegister } from './IUserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../common/form.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }


  newUser: IUserRegister = {
    username: '',
    password: '',
    email: '',
    isManager: "false"
  };


  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.registerUser(this.newUser);
     }
  }

}

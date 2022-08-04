import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../guards/user.service';
import { IUserRegister } from './IUserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../common/styles.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }
  errorRegisterPromise!: Promise<boolean>;
  errorRegister: boolean = false;

  newUser: IUserRegister = {
    username: '',
    password: '',
    email: '',
    isManager: "false"
  };


  ngOnInit(): void {
  }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      this.errorRegisterPromise = this.userService.registerUser(this.newUser);
    }
    console.log(this.errorRegisterPromise.then(data => this.errorRegister));
  }

}

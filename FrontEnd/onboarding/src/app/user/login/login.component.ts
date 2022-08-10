import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../common/IUser';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../common/styles.css']
})

export class LoginComponent implements OnInit {
  errorLogin: boolean | undefined;
  loading: boolean = false;
  errorMsg: string = "";

  user: IUser = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    if (form.valid) {
      this.userService.loginPost(this.user).subscribe(
        {
          next: (value) => { this.userService.setSession(value.token); },
          error: (error) => {
            this.errorLogin = true;
            this.loading = false;
            if(error.status === 0) this.errorMsg = "Server is not available";
            else if (error.status === 401) this.errorMsg = "Invalid username or password";
            else this.errorMsg = "Login Error";
          },
          complete: () => {
            this.loading = false;
            this.router.navigate(['dashboard']);
          },
        }
      );
    }
  }
}

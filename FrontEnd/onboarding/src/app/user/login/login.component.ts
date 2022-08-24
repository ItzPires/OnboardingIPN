import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cookies } from 'src/app/common/enums/Cookies';
import { AuthService } from '../auth.service';
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
  Cookies = Cookies;

  user: IUser = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.authService.login(this.user).subscribe(
        {
          next: (value) => { this.userService.setCookie(Cookies.Token, value.token); },
          error: (error) => {
            this.errorLogin = true;
            this.loading = false;
            if(error.status === 0) this.errorMsg = "serverDown";
            else if (error.status === 401) this.errorMsg = "invalideUsername";
            else this.errorMsg = "error";
          },
          complete: () => {
            this.loading = false;
            this.router.navigate(['dashboard']);
          },
        }
      );
    }
    else
    {

    }
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../common/IUser';
import { UserService } from '../guards/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../common/styles.css']
})

export class LoginComponent implements OnInit {
  errorLogin: boolean | undefined;
  loading: boolean = false;

  user: IUser = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.userService.loginPost(this.user).subscribe(
        {
          next: (value) => { this.userService.setSession(value.token); },
          error: () => { this.errorLogin = true; },
          complete: () => { this.router.navigate(['dashboard']); },
        }
      );

      this.loading = false;
      console.log(this.errorLogin);
    }
  }
}

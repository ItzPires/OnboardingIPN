import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from '../common/IUser';
import { LoginService } from './login.service';
import { Router } from '@angular/router';


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

  constructor(private router: Router, private loginService : LoginService) { }

  private setSession(token: string): void {

    localStorage.setItem('token', token);
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loginService.postUserSettingsForm(this.user).subscribe(
        {
          next: (value) => {this.setSession(value.token);
            this.router.navigate(['']);},
          error: (error) => this.onHttpError(error),
          complete: () => console.log('complete')
        }
      );
     }
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
  }

}

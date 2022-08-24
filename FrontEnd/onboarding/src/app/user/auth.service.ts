import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { IUser } from './common/IUser';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService<IUser> {

  header: HttpHeaders;

  constructor(userService: UserService, http: HttpClient) {
    const projectsUrl = 'Auth';
    super(http, projectsUrl);

    this.header = new HttpHeaders({ 'Authorization': 'Bearer ' + userService.getCookie(this.Cookies.Token) });
  }

  public register(registerForm: any) : Observable<any> {
    var newUser = {"username": registerForm.username, "password": registerForm.password, "email": registerForm.email, "isManager": false};

    if(registerForm.isManager === 'true'){
      newUser.isManager = true;
    }

    return this.post(newUser, 'Register', this.header);
  }

  public login(loginForm: IUser) : Observable<any> {
    return this.post(loginForm, 'login', this.header);
  }

}

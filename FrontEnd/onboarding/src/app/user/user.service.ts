import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserRegister } from './register/IUserRegister';
import { IUser } from './common/IUser';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUsers } from '../dashboard/IUsers';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookie: CookieService)
  {
    this.header = new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() });
  }

  private connectUrl = 'http://localhost:5000/api/Auth/';
  header: HttpHeaders;

  private getHeader(token: string): HttpHeaders
  {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  }

  //cookies
  public setSession(token: string): void {
    this.cookie.set('token', token, 0.125);
  }

  public logout(): void {
    this.cookie.delete('token');
  }

  public getToken(): string {
    return this.cookie.get('token');
  }

  public setLanguage(language: string): void {
    this.cookie.set('language', language, 0.125);
  }

  public getLanguage():  string | null | undefined {
    return this.cookie.get('language');
  }

  //jwt
  private decodedToken(): any {
    const token = this.getToken() || '';
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(token);

    if(helper.isTokenExpired(token))
    {
      this.logout();
      return '';
    }

    return decodedToken;
  }

  public getRole(): string {
    var decodedToken = this.decodedToken();

    return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  public getMyUsername(): string {
    var decodedToken = this.decodedToken();

    return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }

  public registerUser(registerForm: IUserRegister) : Observable<any> {
    var newUser = {"username": registerForm.username, "password": registerForm.password, "email": registerForm.email, "isManager": false};

    if(registerForm.isManager === 'true'){
      newUser.isManager = true;
    }

    return this.http.post(this.connectUrl + 'register', newUser);
  }

  public login(loginForm: IUser) : Observable<any> {
    return this.http.post(this.connectUrl + 'login', loginForm);
  }

  public getUsers(roleOfUsers: string, token: string): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(
      'http://localhost:5000/api/Users/' + roleOfUsers,
      {
        headers: this.getHeader(token),
      }
    );
  }

  public getUserDetails(username: string): any {
    return this.http.get<IUsers>(
      "http://localhost:5000/api/Users/Info/" + username,
      {
        headers: this.header,
      }
    );
  }

  public getUserStats(): any {
    return this.http.get<IUsers>(
      "http://localhost:5000/api/Tasks/Stats/",
      {
        headers: this.header,
      }
    );
  }
}

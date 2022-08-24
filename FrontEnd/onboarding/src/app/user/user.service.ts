import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from './common/IUser';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUsers } from '../dashboard/IUsers';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<IUser> {

  token = "token";
  languade = "language";
  header: HttpHeaders;

  constructor(http: HttpClient, private cookie: CookieService) {
    const projectsUrl = 'Users';
    super(http, projectsUrl);

    this.header = new HttpHeaders({ 'Authorization': 'Bearer ' + this.getCookie(this.Cookies.Token) });
  }

  //cookies
  public setCookie(token: string, value: string): void {
    this.cookie.set(token, value, 0.125);
  }

  public getCookie(token: string): string {
    return this.cookie.get(token);
  }

  public deleteCookie(token: string): void {
    this.cookie.delete(token);
  }

  //jwt
  private decodedToken(): any {
    const tokenVar = this.getCookie(this.token) || '';
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(tokenVar);

    if (helper.isTokenExpired(tokenVar)) {
      this.deleteCookie(tokenVar);
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


  //REST API

  public getUsers(roleOfUsers: string): Observable<IUsers[]> {
    return this.getSpecific(roleOfUsers, this.header);
  }

  public getUserDetails(username: string): any {
    return this.getSpecific("Info/" + username, this.header);
  }

  public getUserStats(): any {
    return this.getSpecific("Stats", this.header);
  }

}

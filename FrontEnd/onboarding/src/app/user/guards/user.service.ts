import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserRegister } from '../register/IUserRegister';
import { IUser } from '../common/IUser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUsers } from '../../dashboard/IUsers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService, private route: ActivatedRoute) { }

  public setSession(token: string): void {
    this.cookie.set('token', token);
  }

  public logout(): void {
    this.cookie.delete('token');
  }

  public getToken(): string | null | undefined {
    return this.cookie.get('token');
  }

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

    return this.http.post('http://localhost:5000/api/Auth/register', newUser);
  }

  public loginPost(loginForm: IUser) : Observable<any> {
    return this.http.post('http://localhost:5000/api/Auth/login', loginForm);
  }

  public loginUser(user: IUser): boolean {
    var errorLogin = false;
    this.loginPost(user).subscribe(
      {
        next: (value) => {this.setSession(value.token);},
        error: () => {return true;},
        complete: () => {this.router.navigate(['dashboard']);},
      }
    );

    return errorLogin = true;
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
  }

   public getProgrammers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(
      "http://localhost:5000/api/Users/programmers",
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() })
      }
    );
  }

  public getManagers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(
      "http://localhost:5000/api/Users/Managers",
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() })
      }
    );
  }

  public getUserDetails(username: string): any {
    return this.http.get<IUsers>(
      "http://localhost:5000/api/Users/Info/" + username,
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() })
      }
    );
  }
}

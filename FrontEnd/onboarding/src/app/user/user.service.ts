import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUserRegister } from './register/IUserRegister';
import { IUser } from './common/IUser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService, private route: ActivatedRoute) { }

  private setSession(token: string): void {
    this.cookie.set('token', token);
  }

  public logout(): void {
    this.cookie.delete('token');
  }

  public getToken(): string | null | undefined {
    return this.cookie.get('token');
  }

  public getRole(): string {
    const token = this.getToken() || '';
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(token);

    if(helper.isTokenExpired(token))
    {
      this.logout();
      return '';
    }

    return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  private registerPost(registerForm: IUserRegister) : Observable<any> {
    var newUser = {"username": registerForm.username, "password": registerForm.password, "email": registerForm.email, "isManager": false};

    if(registerForm.isManager === 'true'){
      newUser.isManager = true;
    }

    return this.http.post('http://localhost:5000/api/Auth/register', newUser);
  }

  public registerUser(registerForm: IUserRegister): void {
    this.registerPost(registerForm).subscribe(
      {
        error: (error) => this.onHttpError("Error: " + error),
        complete: () => this.router.navigate(['login'])
      }
    );
  }

  private loginPost(loginForm: IUser) : Observable<any> {
    return this.http.post('http://localhost:5000/api/Auth/login', loginForm);
  }

  public loginUser(user: IUser): void {
    this.loginPost(user).subscribe(
      {
        next: (value) => {this.setSession(value.token);
          this.resetPage();},
        error: (error) => this.onHttpError(error),
        complete: () => console.log('complete')
      }
    );
  }


  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
  }

  private resetPage() {
    const prevConfiguration = this.router.routeReuseStrategy.shouldReuseRoute;
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     this.router.onSameUrlNavigation = "reload";
     this.router.navigate(["./dashboard"], { relativeTo: this.route }).then(() => {
         this.router.routeReuseStrategy.shouldReuseRoute = prevConfiguration;
         this.router.onSameUrlNavigation = "ignore";
     });
   }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUserRegister } from './register/IUserRegister';
import { IUser } from './common/IUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  getSubscriptionTypes(): Observable<string[]> {
    return of(['Monthly', 'Annual', 'Lifetime']);
  }

  private setSession(token: string): void {

    localStorage.setItem('token', token);
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
          this.router.navigate(['']);},
        error: (error) => this.onHttpError(error),
        complete: () => console.log('complete')
      }
    );
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
  }
}

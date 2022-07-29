import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUserRegister } from './IUserRegister';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  postUserSettingsForm(registerForm: IUserRegister) : Observable<any> {
    var newUser = {"username": registerForm.username, "password": registerForm.password, "email": registerForm.email, "isManager": false};

    if(registerForm.isManager === 'true'){
      newUser.isManager = true;
    }

    return this.http.post('http://localhost:5000/api/Auth/register', newUser);
  }
}

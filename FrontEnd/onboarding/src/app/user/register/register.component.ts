import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUserRegister } from './IUserRegister';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../common/form.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService) { }
  newUser: IUserRegister = {
    username: '',
    password: '',
    email: '',
    isManager: "false"
  };


  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.registerService.postUserSettingsForm(this.newUser).subscribe(
        {
          error: (error) => this.onHttpError(this.newUser),
          complete: () => console.log('complete')
        }
      );
     }
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
  }

}

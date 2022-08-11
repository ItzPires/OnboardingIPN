import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { IUserRegister } from './IUserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../common/styles.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,) { }
  errorRegisterPromise!: Promise<boolean>;
  errorRegister: boolean = false;
  loading: boolean = false;
  errorMsg: string = "";

  newUser: IUserRegister = {
    username: '',
    password: '',
    email: '',
    isManager: "false"
  };


  ngOnInit(): void {
  }

  public isValidEmail(email: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    if (form.valid) {
      this.userService.registerUser(this.newUser).subscribe(
        {
          error: (error) => {
            this.loading = false;
            this.errorRegister = true;
            if (error.status === 0) this.errorMsg = "Server is not available";
            else if (error.status === 406) this.errorMsg = "Username already exists.";
          },
          complete: () => {
            this.loading = false;
            this.router.navigate(['login']);
          }
        }
      );
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { IUserRegister } from './IUserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../common/styles.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,) { }
  errorRegisterPromise!: Promise<boolean>;
  errorRegister: boolean = false;
  loading: boolean = false;
  errorMsg: string = "";

  newUser!: FormGroup;


  ngOnInit(): void {
    this.newUser = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      isManager: ['false', [Validators.required]]
    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup) {
    var password = formGroup.get('password');
    var confirmPassword = formGroup.get('confirmPassword');
    return password?.value == confirmPassword?.value ? null : { passwordNotMatch: true };
  }

  onSubmit() {
    if (this.newUser.valid) {
      this.loading = true;
      this.authService.register(this.newUser.value as IUserRegister).subscribe(
        {
          error: (error) => {
            this.loading = false;
            this.errorRegister = true;
            if (error.status === 0) this.errorMsg = "serverDown";
            else if (error.status === 406) this.errorMsg = "userExists";
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

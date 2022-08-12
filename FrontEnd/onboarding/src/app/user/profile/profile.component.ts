import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUsers } from 'src/app/dashboard/IUsers';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../common/styles.css']
})
export class ProfileComponent {
  userName: string = "";
  userInfo!: IUsers;

  constructor(public dialogRef: MatDialogRef<ProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: { user: string }, private userService: UserService)
  {
    this.userName = data.user;

    this.userService.getUserDetails(this.userName).subscribe(
      {
        next: (value: IUsers) => { this.userInfo = value; },
        error: () => { console.log("error"); }
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}

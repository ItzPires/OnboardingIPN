import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Cookies } from '../common/enums/Cookies';
import { ProfileComponent } from '../user/profile/profile.component';
import { Roles } from '../user/Roles';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  userRole: string | undefined;
  language: string | null | undefined;
  Roles = Roles;
  Cookies = Cookies;

  constructor (private userService : UserService, private router: Router, private translate: TranslateService, public dialog: MatDialog) {}

  ngOnInit()
  {
    this.userRole =  this.userService.getRole();
    this.language = this.userService.getCookie(Cookies.Language);

    if (this.language == null || this.language == undefined || this.language == '') {
      this.language = 'en';
      this.changeSiteLanguage(this.language);
    }
    else
    {
      this.translate.use(this.language);
    }
  }

  logout()
  {
    this.userService.deleteCookie(Cookies.Token);
    this.userRole = undefined;
    this.router.navigate(['/']);
  }

  changeSiteLanguage(language: string): void {
    this.language = language;
    this.translate.use(language);
    this.userService.setCookie(Cookies.Language, language);
  }

  openDialogUser(): void {
    var dialog = this.dialog.open(ProfileComponent, {
      data: { user: this.userService.getMyUsername() }
    });
  }
}

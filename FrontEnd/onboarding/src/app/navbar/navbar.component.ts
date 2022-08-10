import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole: string | undefined;
  language: string | null | undefined;

  constructor (private userService : UserService, private router: Router, private translate: TranslateService) {}

  ngOnInit()
  {
    this.userRole =  this.userService.getRole();
    this.language = this.userService.getLanguage();

    if (this.language == null || this.language == undefined || this.language == '') {
      this.language = 'en';
      this.changeSiteLanguage(this.language);
    }
    else
    {
      console.log("Language is " + this.language);
      this.changeSiteLanguage(this.language);
    }
  }

  logout()
  {
    this.userService.logout();
    this.userRole = undefined;
    this.router.navigate(['/']);
  }

  changeSiteLanguage(language: string): void {
    this.language = language;
    this.translate.use(language);
    this.userService.setLanguage(language);
  }

}

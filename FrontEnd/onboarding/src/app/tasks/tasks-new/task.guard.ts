import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/user/Roles';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.userService.getRole() == Roles.Manager)
      {
        return true;
      }

    this.router.navigate(['/dashboard']);
    return false;
  }

}

  import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService, UserRolesService} from './services'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private srvRolesByUser: UserRolesService){}

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(this.authService.isLoggedIn() && this.srvRolesByUser.getRolesLocalStorage()){
        return true;
      }

      this.router.navigate(['login']);
      return false;
  }
}

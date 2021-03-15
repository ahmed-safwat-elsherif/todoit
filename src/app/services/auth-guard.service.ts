import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import {UserService} from './user.service';
@Injectable({providedIn: "root"})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log("FSDFASDF ADSFD AFASFSDAF")
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
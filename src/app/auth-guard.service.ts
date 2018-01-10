import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole,
          token = localStorage.getItem('token');

    if (!token) {
      this.redirectToLogin();
      return false;
    }

    const tokenPayload = decode(token);

    function hasRole(role) {
      return role === tokenPayload.role;
    }

    if (!this.auth.isAuthenticated() || !expectedRole.some(hasRole)) {
      this.redirectToLogin();
      return false;
    }

    return true;
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }
}

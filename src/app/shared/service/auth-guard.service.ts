import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { StateManagmentService } from './state-managment.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private stateManagmentService: StateManagmentService) {};

  canActivate(route, state: RouterStateSnapshot) {
    if (this.stateManagmentService.isLoggedIn()) return true;
    
    this.router.navigate(['/login'], {queryParams: {returnUrl:state.url}});
    return false;
  };
};
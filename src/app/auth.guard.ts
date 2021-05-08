import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthServiceService} from './auth-service.service';
import {Router} from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthServiceService,private myroute:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.isLoggednIn()){
        return true;
      }else{
         return false;
      }
  }
}

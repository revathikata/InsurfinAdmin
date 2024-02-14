import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { LoginServiceService } from './login-service.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private auth:LoginServiceService,private router: Router){ }

  // canActivate() {
  //   if (!this.auth.isAuthenticated()) {
  //     // sessionStorage.removeItem('loginDetails')
  //     // sessionStorage.clear()
  //     // window.location.reload()
  //     return of(false);
  //   }
  //   return of(true);
  // }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (sessionStorage.getItem('loginDetails')) {
        console.log('check');
        
        return true;
      }else {
        sessionStorage.removeItem('loginDetails');
        this.router.navigate(['login']);
        console.log('check','kl');
      return false;
    }
  }
}



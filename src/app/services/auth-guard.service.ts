import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor() { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // if (!this.auth.isAuthenticated()) {
    //     this.router.navigate(['/login']);
    //     return false;
    //   }
    //   if (route.url.length > 1){
    //     let roleId = this.storageService.get('role');
    //     if ((roleId == '2') && route.url[0].path === 'admin'){
    //       if ( route.url[1].path !=='edit-customer'){

    //         this.router.navigate(['/userdetail/user-history']);
    //       }
    //     }
    //     if ((roleId == '3') && route.url[0].path === 'admin'){
    //       if ( route.url[1].path !=='edit-driver'){

    //         this.router.navigate(['/userdetail/user-history']);
    //       }
    //     }
    //   }
      return true;
  }
}

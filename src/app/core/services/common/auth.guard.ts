import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../../services/user/user.service";
import { Router } from "@angular/router";
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private AuthenticationService: AuthenticationService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
          let url: string = state.url;
          return this.checkLogin(url);
        // if (!this.userService.isLoggedIn()) {
        //     this.router.navigateByUrl('/login');
        //     this.userService.deleteToken();
        //     return false;
        // } else {
        //     return true;
        // }
       
    }

    checkLogin(url: string): boolean {

      // if (this.userService && this.userService.auth_email) {
      //   this.userService
      //     .GetLoginDetailById(this.userService.auth_email)
      //     .subscribe(data => {

      //       if (!data) {
      //         this.userService.logout();
      //         this.router.navigate(['login']);
      //       }
      //     },
      //   data => {
      //     if (data) {
      //       this.userService.logout();
      //       this.router.navigate(['login']);
      //     }
      //   }
      // );
      // }
  
      if (this.userService.isLoggedIn()) {
        this.userService.getLoginUser();
        return true;
      }
    
      // Store the attempted URL for redirecting
      this.userService.redirectUrl = url;
  
      // Navigate to the login page with extras
      this.router.navigate(['/login']);
      return false;
    }
}
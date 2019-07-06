import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { APP_CONFIG } from './../../configuration/app.config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated() && localStorage.getItem(APP_CONFIG.storageKeys.token)) {
      const storageKey = APP_CONFIG.storageKeys.resetPasswordFlag;

      if (sessionStorage.getItem(storageKey) === "1") {
        sessionStorage.setItem(storageKey, "0");
        this.authService.resetPassword();
        return false;
      }
      else {
        this.authService.login();
        return false;
      }
    }
    
    return true;
  }
}

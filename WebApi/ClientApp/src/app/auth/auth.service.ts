import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msal';
import { APP_CONFIG } from './../../configuration/app.config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly errorName = "access_denied";
  private readonly forgotPasswordErrorCode = 'AADB2C90118';
  private app: any;
  
  constructor() {
    this.app = new UserAgentApplication(
      APP_CONFIG.auth.clientId,
      APP_CONFIG.auth.loginAuthority,
      this.tokenRecievedCallback.bind(this),
      {
        validateAuthority: false,
        cacheLocation: 'localStorage',
      }
    );
    this.app.redirectUri = APP_CONFIG.auth.redirectUri;
   }

   public login() {
    return this.app.loginRedirect(APP_CONFIG.auth.scopes);
  }

  public logout() {
    return this.app.logout();
  }

  public resetPassword() {
    this.app = new UserAgentApplication(
      APP_CONFIG.auth.clientId,
      APP_CONFIG.auth.resetPasswordAuthority,
      this.tokenRecievedCallback.bind(this),
      {
        validateAuthority: false
      }
    );

    return this.app.loginRedirect(APP_CONFIG.auth.scopes);
  }

  public getToken(): string {
    return localStorage.getItem(APP_CONFIG.storageKeys.token);
  }

  public isAuthenticated(): boolean {
    return this.app.getUser() !== null;
  }

  private tokenRecievedCallback(errorDesc: any, token: any, error: any, tokenType: any) {
    if (errorDesc || error) {
      console.log(error, ':', errorDesc);
    }
    
    if(error === this.errorName) {
      this.handleAccessDeniedErrors(errorDesc);

      return;
    }
  }

  private handleAccessDeniedErrors(errorDesc: string): void {
    if (errorDesc.toString().includes(this.forgotPasswordErrorCode)) {
      sessionStorage.setItem(APP_CONFIG.storageKeys.resetPasswordFlag, "1");
    }
  }
}

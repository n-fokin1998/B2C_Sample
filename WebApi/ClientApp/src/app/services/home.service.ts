import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { APP_CONFIG } from './../../configuration/app.config.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  public getData(): Observable<string> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + token);
    const apiUrl = APP_CONFIG.api + '/api/home';
    
    return this.httpClient.get<string>(apiUrl, { headers: headers })
      .pipe(
        map(data => { return data; }),
         catchError(e => of(e)));
  }
}

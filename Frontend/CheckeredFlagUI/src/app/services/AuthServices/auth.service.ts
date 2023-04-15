import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';


import { CookieHandlerService } from './cookie-handler.service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private _cookieHandler:CookieHandlerService,private router:Router) {}

  public register(user: User): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7085/api/Authentication/Register',
      user
    );
  }

  public login(user: User): Observable<string> {
    return this.http.post('https://localhost:7085/api/Authentication/Login', user, {
      responseType: 'text',
    });
  }

  public getMe(): Observable<string> {
    return this.http.get('https://localhost:7085/Authentication/Auth', {
      responseType: 'text',
    });
  }

  logout() {
    // remove user from local storage and set current user to null
    //localStorage.removeItem('authToken');

    //this.cookie.delete('authToken');
    this._cookieHandler.closeToken();
    this.router.navigate(['/'], {queryParams: {loggedOut: 'success'}});

}
}

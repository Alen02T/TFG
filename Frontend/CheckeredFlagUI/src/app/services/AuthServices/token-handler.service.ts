import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { CookieHandlerService } from './cookie-handler.service';
import { DirectorService } from './director.service';
import { Director } from 'src/app/models/director.model';



@Injectable()
export class TokenHandlerService {
  constructor(
    private _cookieHandler: CookieHandlerService,
    private _director:DirectorService
  ) {}

  // HANDLE TOKEN (get params from decoded token)
  // 1. Get token content
  getDecodedAccessToken(): any {
    try {
      return jwt_decode(this._cookieHandler.getCookie());
    } catch (Error) {
      return null;
    }
  }

  // 2. Get user
  getEmail(): string {
    try {
      console.log(this.getDecodedAccessToken()['email'])
      return this.getDecodedAccessToken()['email'];
    } catch (Error) {
      return '';
    }
  }

  // 3. Get Empleado
  getDirector(): Observable<Director> {
    //var email = this.getEmail();
    console.log(this.getEmail())
    return this._director.getUserDirectorData(this.getEmail());
  }
}

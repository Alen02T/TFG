import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable()
export class CookieHandlerService {
  constructor(private cookie: CookieService) {}

  // HANDLE COOKIES
  // 1. Create cookie
  public setCookie(token: string) {
    this.cookie.set('authToken', token);
  }

  // 2. Get cookie
  public getCookie() {
    return this.cookie.get('authToken');
  }

  // 3. Delete cookie
  public closeToken() {
    // Cerramos sesión
    this.cookie.delete('authToken');
  }
}

//Era X-Token

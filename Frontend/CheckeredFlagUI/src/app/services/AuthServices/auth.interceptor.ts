import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieHandlerService } from './cookie-handler.service';
import { TokenHandlerService } from './token-handler.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    //private _cookie: CookieHandlerService,
    //private _token: TokenHandlerService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //const token = localStorage.getItem('authToken');
    //const token = this._cookie.getCookie();
    //const email = this._token.getEmail();



    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` , 'X-Login': email},

      });
/*
      const authReq = req.clone({
      headers:req.headers.set('authToken',token)

    });*/
    }

    return next.handle(req);
  }
}

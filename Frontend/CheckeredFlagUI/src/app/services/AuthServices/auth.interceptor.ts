import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { CookieHandlerService } from './cookie-handler.service';
import { TokenHandlerService } from './token-handler.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _cookie: CookieHandlerService,
    private _token: TokenHandlerService,private _router:Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //const token = localStorage.getItem('authToken');
    const token = this._cookie.getCookie();
    const email = this._token.getEmail();

    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` , 'X-Login': email},

      });
/*
      const authReq = req.clone({
      headers:req.headers.set('authToken',token)

    });*/
    }

    return next.handle(req).pipe(
      catchError(this.manejadorPeticionesError.bind(this)));
  }


   //Maneja las peticiones de servicios
   private manejadorPeticionesError(err:any){
    const unauthorized = 401
    const not_found=404
    const server_error=500

    if(err instanceof HttpErrorResponse){
      if(err.status===unauthorized){
        this._router.navigate([("errors")])
      }
      if(err.status===server_error){
        this._router.navigateByUrl("errors/500")
      }
      if(err.status===not_found){
        this._router.navigateByUrl("errors/404")
      }
    }
      return throwError(err)
    }
}

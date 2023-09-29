import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/* This service deals with sending token in the requests headers since backend implements spring security, through every request add the sessionToken jwt */

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  /* Method intercepts every request sent from the services and adds the sessionToken in its headers */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(sessionStorage.getItem('sessionToken')!=null){
        const sessionToken = sessionStorage.getItem('sessionToken');
        const authReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + sessionToken)});
        return next.handle(authReq);
    }else{
      return next.handle(request);
    }    
  }
}

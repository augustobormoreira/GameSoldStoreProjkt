import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(sessionStorage.getItem('sessionToken')!=null){
        const sessionToken = sessionStorage.getItem('sessionToken');
        const authReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + sessionToken)});
        console.log(authReq);
        return next.handle(authReq);
    }else{
      return next.handle(request);
    }    
  }
}

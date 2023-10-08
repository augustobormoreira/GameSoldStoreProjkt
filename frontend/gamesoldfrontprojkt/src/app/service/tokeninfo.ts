import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
/**
 * Simple class to store this one decodeJWT method that is used in some cases on the application
 */
@Injectable()
export class TokenInfo{
    constructor () {}

    decodeJWT(): any{
        try {
          return jwtDecode(sessionStorage.getItem('sessionToken')!);
        }catch(Error){
          return null;
        }
    }
}
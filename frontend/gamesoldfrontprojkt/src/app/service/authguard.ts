import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { TokenInfo } from './tokeninfo';
/**
 * Simple authguard to check if the user activating the route is an ADMIN or not.
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private tokenInfo: TokenInfo) {}

    /* Method returns true if the userRole stored in the token is an admin, else returns false */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.tokenInfo.decodeJWT().userIdAndName[1] === "ADMIN") return true;

        return false;
    }


    
}
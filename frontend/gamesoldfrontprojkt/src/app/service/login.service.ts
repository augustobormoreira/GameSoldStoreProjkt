import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { UserDTO } from '../components/model/UserDTO';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

/* This service is responsible for all method login related, receives httpClient and a router via dependency injections */
@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient, private route: Router) {}


    /* Method receives a userDTO as parameter and sends it for authentication and login on backend */
    loginUser(userDTO: UserDTO): Observable<any>{
        return this.http.post(`${environment.API_URL}/auth/login`, userDTO);
    }

    /* Method upon call clears sessionStorage and redirects to UserLoginComponent */
    logoutUser(){
        sessionStorage.clear();
        this.route.navigateByUrl("/user-login");
    }
}

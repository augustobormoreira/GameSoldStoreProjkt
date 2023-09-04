import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { UserDTO } from '../components/model/UserDTO';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {}

    loginUser(userDTO: UserDTO): Observable<any>{
        return this.http.post(`${environment.API_URL}/auth/login`, userDTO);
    }
}

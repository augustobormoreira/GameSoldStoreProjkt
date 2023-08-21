import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { UserDTO } from '../components/model/game/UserDTO';
import { environment } from '../../environments/environment';
import { User } from '../components/model/game/User';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private loginUrl: string = `${environment.API_URL}/auth/login`;

    constructor(private http: HttpClient) {}

    loginUser(userDTO: UserDTO): Observable<any>{
        return this.http.post(`${environment.API_URL}/auth/login`, userDTO);
    }
}

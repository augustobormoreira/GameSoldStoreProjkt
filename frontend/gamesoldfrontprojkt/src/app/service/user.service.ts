import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../components/model/User';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private addUserUrl: string = `${environment.API_URL}/users`;

    constructor(private httpClient: HttpClient) {}

    addNewEmployee(user: User){
        this.httpClient.post(`${environment.API_URL}/users/addEmployee`, user).subscribe((result) =>{
           console.log(result); 
        });
    }

    
}

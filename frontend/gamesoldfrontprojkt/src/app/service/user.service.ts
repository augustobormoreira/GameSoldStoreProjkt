import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../components/model/User';
import { UserEmployee } from '../components/model/UserEmployee';
import { UserClient } from '../components/model/UserClient';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) {}


    getUserById(id: String): Observable<User>{
        return this.httpClient.get<User>(`${environment.API_URL}/users/${id}`);
        
    }

    addNewEmployee(user: UserEmployee){
        this.httpClient.post(`${environment.API_URL}/users/addEmployee`, user).subscribe((result) =>{
           console.log(result); 
        });
    }

    addNewClient(user: UserClient){
        this.httpClient.post(`${environment.API_URL}/users/addClient`, user).subscribe((result) =>{
            console.log(result); 
         });
    }

    deleteExistingEmployee(userId: number){
        this.httpClient.delete(`${environment.API_URL}/users/deleteUser/${userId}`).subscribe((result) => {
            console.log(result);
        })
    }

    updateExistingClient(userId: String, updatedClient: UserClient){
        this.httpClient.put(`${environment.API_URL}/users/updateClient/${userId}`, updatedClient).subscribe((result) => {
            console.log(result);
        })
    }

    updateExistingEmployee(userId: String, updatedEmployee: UserEmployee){
        this.httpClient.put(`${environment.API_URL}/users/updateEmployee/${userId}`, updatedEmployee).subscribe((result) => {
            console.log(result);
        })
    }

    
}

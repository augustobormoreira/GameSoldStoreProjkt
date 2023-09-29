import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../components/model/User';
import { UserEmployee } from '../components/model/UserEmployee';
import { UserClient } from '../components/model/UserClient';

/* Class responsible for all method user related, injecting httpClient via dependency injection */
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) {}


    /* Method looks for user in database by ID, return an observable  */
    getUserById(id: String): Observable<User>{
        return this.httpClient.get<User>(`${environment.API_URL}/users/${id}`);
        
    }


    getAllUsers() {
        return this.httpClient.get(`${environment.API_URL}/users/allUsers`);
    }

    /* Method adds new employee to database, receives a UserEmployee as parameter */
    addNewEmployee(user: UserEmployee){
        this.httpClient.post(`${environment.API_URL}/users/addEmployee`, user).subscribe((result) =>{
           console.log(result); 
        });
    }

    /* Method adds new client to database, receives a UserClient as parameter */
    addNewClient(user: UserClient){
        this.httpClient.post(`${environment.API_URL}/users/addClient`, user).subscribe((result) =>{
            console.log(result); 
         });
    }

    /* Method deletes user on database, receives a id as number as parameter */
    deleteExistingEmployee(userId: number){
        this.httpClient.delete(`${environment.API_URL}/users/deleteUser/${userId}`).subscribe((result) => {
            console.log(result);
        })
    }

    /* Method updates existing client on database, receives the client id and an object UserClient */
    updateExistingClient(userId: String, updatedClient: UserClient){
        this.httpClient.put(`${environment.API_URL}/users/updateClient/${userId}`, updatedClient).subscribe((result) => {
            console.log(result);
        })
    }

    /* Method updates existing employee on database, receives the employee id and an object UserEmployee */
    updateExistingEmployee(userId: String, updatedEmployee: UserEmployee){
        this.httpClient.put(`${environment.API_URL}/users/updateEmployee/${userId}`, updatedEmployee).subscribe((result) => {
            console.log(result);
        })
    }

    
}

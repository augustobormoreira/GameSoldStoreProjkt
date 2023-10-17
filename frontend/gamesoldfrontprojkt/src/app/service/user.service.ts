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

    /* Method looks for user specified as a client in database by ID, return an observable  */
    getClientById(id: String): Observable<UserClient>{
        return this.httpClient.get<UserClient>(`${environment.API_URL}/users/${id}`);
    }

    /* This method gets all the users on the database and returns it as an observable */
    getAllUsers() {
        return this.httpClient.get(`${environment.API_URL}/users/allUsers`);
    }

    /* Method adds new employee to database, receives a UserEmployee as parameter */
    addNewEmployee(user: UserEmployee){
        this.httpClient.post(`${environment.API_URL}/users/addEmployee`, user).subscribe((result) =>{
           if(result){
                alert("Employee added with success!");
           }else{
                alert("Something went wrong when adding employee!");
           }
        });
    }

    /* Method adds new client to database, receives a UserClient as parameter */
    addNewClient(user: UserClient){
        this.httpClient.post(`${environment.API_URL}/users/addClient`, user).subscribe((result) =>{
            if(result){
                alert("Client added with success!");
            }else{
                alert("Something went wrong when adding the client!");
            }
         });
    }

    /* Method deletes user on database, receives a id as number as parameter */
    deleteExistingEmployee(userId: number){
        this.httpClient.delete(`${environment.API_URL}/users/deleteUser/${userId}`).subscribe((result) => {
            if(result){
                alert("User deleted with success!");
            }else{
                alert("Something went wrong when deleting user!");
            }
        })
    }

    /* Method updates existing client on database, receives the client id and an object UserClient */
    updateExistingClient(userId: String, updatedClient: UserClient){
        this.httpClient.put(`${environment.API_URL}/users/updateClient/${userId}`, updatedClient).subscribe((result) => {
            if(result){
                alert("Client updated with success!");
            }else{
                alert("Something went wrong when updating client!");
            }
        })
    }

    /* Method updates existing employee on database, receives the employee id and an object UserEmployee */
    updateExistingEmployee(userId: String, updatedEmployee: UserEmployee){
        this.httpClient.put(`${environment.API_URL}/users/updateEmployee/${userId}`, updatedEmployee).subscribe((result) => {
            if(result){
                alert("Employee updated with success!");
            }else{
                alert("Something went wrong when updating employee!");
            }
        })
    }

    /* This method gets from the backend a pdf report of all the users in the database , turns into a pdf file and downloads it to the user */
    getUserReport(){
        this.httpClient.get(`${environment.API_URL}/users/users_report`, {responseType: 'blob'}).subscribe((data) => {
            var blob = new Blob([data], {type: 'application/pdf'});
      
            var downloadUrl = window.URL.createObjectURL(data);
            var link = document.createElement('a');
            link.href = downloadUrl;
            link.download = "users_report.pdf";
            link.click();
          });
    }

    
}

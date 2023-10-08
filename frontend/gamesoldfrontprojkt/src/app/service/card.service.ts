import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardDTO } from '../components/model/CardDTO';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Card } from '../components/model/Card';
/**
 * This service is responsible for all card methods related.
 */
@Injectable({
  providedIn: 'root'
})
export class CardService {

  /* Upon construction, receives a httpClient via dependency injection */
  constructor(private httpClient: HttpClient) { }


  /* This method is responsible for adding a new card into the database, receives a CardDTO as a parameter. */
  addNewCard(cardDTO: CardDTO){
    this.httpClient.post(`${environment.API_URL}/cards/new-card`, cardDTO).subscribe((data) => {
      if(data){
        alert('Payment method added with success!');
      }
    })
  }

  /* This method is responsible for getting all cards belonging to a specific user. It receives the username as parameter and returns an observable of card arrays */
  getAllCardsByClientUserName(userName: String): Observable<Array<Card>>{
    return this.httpClient.get<Array<Card>>(`${environment.API_URL}/cards/${userName}/all-cards`);
  }
}

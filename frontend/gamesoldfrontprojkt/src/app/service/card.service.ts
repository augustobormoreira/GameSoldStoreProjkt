import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardDTO } from '../components/model/CardDTO';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Card } from '../components/model/Card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) { }


  addNewCard(cardDTO: CardDTO){
    this.httpClient.post(`${environment.API_URL}/cards/new-card`, cardDTO).subscribe((data) => {
      if(data){
        alert('Payment method added with success!');
      }
    })
  }

  getAllCardsByClientUserName(userName: String): Observable<Array<Card>>{
    return this.httpClient.get<Array<Card>>(`${environment.API_URL}/cards/${userName}/all-cards`);
  }
}

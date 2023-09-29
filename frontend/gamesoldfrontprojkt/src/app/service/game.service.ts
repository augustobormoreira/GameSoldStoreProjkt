import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Game } from "../components/model/Game";

/* Service responsible for all methods gameProducts related, receives an httpClient via dependency injection */
@Injectable({
    providedIn: 'root'
})
export class GameService {
    private productUrl: string = `${environment.API_URL}/games/all`;
    constructor(private httpClient: HttpClient){}
    
    /* This is a get Method. Returns an observable of an array of every game upon call */
    getAllGames(): Observable<Game[]>{
        return this.httpClient.get<Game[]>(this.productUrl);
    }

    /* This is a get method. Returns an observable of the specific game, receives gameId as parameter */
    getGameById(gameId: String): Observable<Game>{
        return this.httpClient.get<Game>(`${environment.API_URL}/games/${gameId}`);
    }

    /* This is a post method. It receives a Game object as parameter and sends it to add on database.*/
    addNewGame(game: Game){
        this.httpClient.post(`${environment.API_URL}/games/addProduct`, game).subscribe((result) => {
            console.log(result);
        })
    }
    
    /* This is a put method. It receives a Game object as parameter and sends it to be updated on database.  */
    updateGame(game: Game){
        this.httpClient.put(`${environment.API_URL}/games/updateProduct/${game.productId}`, game).subscribe((result) => {
            console.log(result);
        });
    }

    /* This is a delete method. It receives an ID as parameter and calls for a deletion on the database. */
    removeGame(productId: number){
        this.httpClient.delete(`${environment.API_URL}/games/removeProduct/${productId}`).subscribe((result) => {
            console.log(result);
        });
    }
} 
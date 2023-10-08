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
            if(result){
                alert("Game added with success!");
            }else{
                alert("Something went wrong when adding game!");
            }
        })
    }
    
    /* This is a put method. It receives a Game object as parameter and sends it to be updated on database.  */
    updateGame(game: Game){
        this.httpClient.put(`${environment.API_URL}/games/updateProduct/${game.productId}`, game).subscribe((result) => {
            if(result){
                alert("Game updated with success!");
            }else{
                alert("Something went wrong when updating game!");
            }
        });
    }

    /* This is a delete method. It receives an ID as parameter and calls for a deletion on the database. */
    removeGame(productId: number){
        this.httpClient.delete(`${environment.API_URL}/games/removeProduct/${productId}`).subscribe((result) => {
            if(result){
                alert("Game removed with success!");
            }else{
                alert("Something went wrong when removing game!");
            }
        });
    }

    /* This method is responsible for getting a pdf report of games from the backend, afterwards it turns it into a pdf file and downloads it to the user. */
    getGameReport(){
        this.httpClient.get(`${environment.API_URL}/games/gamesReport`, {responseType: 'blob'}).subscribe((data) => {
            var blob = new Blob([data], {type: 'application/pdf'});
      
            var downloadUrl = window.URL.createObjectURL(data);
            var link = document.createElement('a');
            link.href = downloadUrl;
            link.download = "game_report.pdf";
            link.click();
          })
    }
} 
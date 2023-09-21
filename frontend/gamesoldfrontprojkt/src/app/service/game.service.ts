import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Game } from "../components/model/Game";


@Injectable({
    providedIn: 'root'
})
export class GameService {
    private productUrl: string = `${environment.API_URL}/games/all`;
    constructor(private httpClient: HttpClient){}
    
    getAllGames(): Observable<Game[]>{
        return this.httpClient.get<Game[]>(this.productUrl);
    }

    getGameById(gameId: String): Observable<Game>{
        return this.httpClient.get<Game>(`${environment.API_URL}/games/${gameId}`)
    }

    addNewGame(game: Game){
        this.httpClient.post(`${environment.API_URL}/games/addProduct`, game).subscribe((result) => {
            console.log(result);
        })
    }

    updateGame(game: Game){
        this.httpClient.put(`${environment.API_URL}/games/updateProduct/${game.productId}`, game).subscribe((result) => {
            console.log(result);
        })
    }
} 
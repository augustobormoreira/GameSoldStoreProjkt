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
} 
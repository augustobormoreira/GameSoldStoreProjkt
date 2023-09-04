import { Component, OnInit } from '@angular/core';
import { Game } from '../model/Game';
import { GameService } from 'src/app/service/game.service';
import { SearchGameService } from 'src/app/service/searchGame.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  nameToBeSearched: String;
  gameIsFound: boolean = false;
  games: Array<Game> = [];
  
  constructor(private gameService: GameService, private searchGameService: SearchGameService) {
    this.nameToBeSearched = "";
   }

  ngOnInit(): void {
    if(sessionStorage.getItem('sessionToken')!=null){
      this.retrieveAllGames();
    }
    this.searchGameService.userTriggerSearchEvent.subscribe((data: string) => {
      if(data == ""){
        this.retrieveAllGames();
      }else{
        this.retrieveNamedGame(data);
      }
      
    })
  }

  retrieveNamedGame(gameToBeSearched: String){
    let tempArrayofGames: Array<Game> = [];
    for(let game of this.games){
      if(game.productName.toLocaleLowerCase().indexOf(gameToBeSearched.toLocaleLowerCase()) >= 0){
        tempArrayofGames.push(game);
      }
    }
    this.games = tempArrayofGames;
  }

  retrieveAllGames(){
    this.gameService.getAllGames().subscribe((data => {
      this.games = data;
    }));
  }

}

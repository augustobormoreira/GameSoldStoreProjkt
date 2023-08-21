import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game/Game';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  nameToBeSearched: String;
  games: Array<Game> = [];
  
  constructor(private gameService: GameService) {
    this.nameToBeSearched = "";
   }

  ngOnInit(): void {
    if(localStorage.getItem('sessionToken')!=null){
      this.retrieveAllGames();
    }
  }

  retrieveNamedGame(gameToBeSearched: HTMLInputElement){
    let tempArrayofGames: Array<Game> = []
    for(let game of this.games){
      if(game.productName.toLocaleLowerCase().indexOf(gameToBeSearched.value.toLocaleLowerCase()) >= 0){
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

import { Component, OnInit } from '@angular/core';
import { Game } from '../model/Game';
import { GameService } from 'src/app/service/game.service';
import { SearchGameService } from 'src/app/service/searchGame.service';
import { MatListOption, MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  typesOfTags: string[] = ['Ação', 'RPG', 'Story-Driven', 'Hack n Slash'];
  nameToBeSearched: String;
  games: Array<Game> = [];
  listedTags!: MatSelectionList;
  
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

  printSelectedOptions(tags: any){
    let tempArrayofGames: Array<Game> = [];
    if(tags.length > 0){
      for(let tag of tags){
        for(let game of this.games){
          if( game.productTags.indexOf(tag.value) > -1 && this.checkIfObjectIsNotInArray(game, tempArrayofGames)){
            tempArrayofGames.push(game);
          }
        }
      }
      this.games = tempArrayofGames; 
    }else{
      alert("nenhum filtro selecionado!");
    }
  }

  removeFilters(tags: any ){
    tags.deselectAll();
    this.retrieveAllGames();
  }

  checkIfObjectIsNotInArray(game: Game, tempArrayofGames: Array<Game>){
    for(let tempGame of tempArrayofGames){
      if(game.productName === tempGame.productName){
        return false;
      }
    }

    return true;
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

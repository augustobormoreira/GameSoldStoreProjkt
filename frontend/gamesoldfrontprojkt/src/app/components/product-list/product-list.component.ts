import { Component, OnInit } from '@angular/core';
import { Game } from '../model/Game';
import { GameService } from 'src/app/service/game.service';
import { SearchGameService } from 'src/app/service/searchGame.service';
import { MatListOption, MatSelectionList } from '@angular/material/list';
/**
 * This component is responsible for the display of all products for the user to browse.
 */
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
  
  /* Injects a gameService and a searchGameService via dependency injection and initializes the variable nameToBeSearched with an empty string */
  constructor(private gameService: GameService, private searchGameService: SearchGameService) {
    this.nameToBeSearched = "";
   }

   /* Upon initialization check if there is a sessionToken object stored which means a user is logged in then calls for the method retrieveAllGames().
   Afterwards it subscribes to the userTriggerSearchEvent from the searchGameService to perform the necessary search on all the games with the
   retrieved value(this part is responsible for the search of a game based on name or character, more is explained in SearchGameService) */
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

  /* This method gets all games from the original list retrieve from the server based on the tags provided by the user. An array of strings is received from the user input
  this array is iterated while also iterating another array of games, every game has its tags searched to check if any has the current tag, if so, a verification is done
  to check if the game is not already added in the array of games found by tags, if not then it is added into the array of games */
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


  /* If the user choses to remove every filter that he has selected, the method deselectAll() is called and afterwards a call if made for the server to retrieve all games. */
  removeFilters(tags: any ){
    tags.deselectAll();
    this.retrieveAllGames();
  }

  /* This method checks if the game is not in the array, it receives the game to be found and the array of games, if the game exists in the array it returns false, if not
  returns true  */
  checkIfObjectIsNotInArray(game: Game, tempArrayofGames: Array<Game>){
    for(let tempGame of tempArrayofGames){
      if(game.productName === tempGame.productName){
        return false;
      }
    }

    return true;
  }

  /* This method is responsible for the search of a game when the user types it in the searchbar, it receives a string as a parameter and checks the current array of all games
  to see if any of the games has any of the characters, or string that the user has typed, if so it pushes into a temporary array and after the iteration of the current array
  of all games is finished, the current array of all games becomes the temporary array, only displaying the games the user has searched for */
  retrieveNamedGame(gameToBeSearched: String){
    let tempArrayofGames: Array<Game> = [];
    for(let game of this.games){
      if(game.productName.toLocaleLowerCase().indexOf(gameToBeSearched.toLocaleLowerCase()) >= 0){
        tempArrayofGames.push(game);
      }
    }
    this.games = tempArrayofGames;
  }

  /* This method is responsible for calling the method getAllGames() from the service gameService, it retrieves all games from the service to be displayed for the user */
  retrieveAllGames(){
    this.gameService.getAllGames().subscribe((data => {
      this.games = data;
    }));
  }

}

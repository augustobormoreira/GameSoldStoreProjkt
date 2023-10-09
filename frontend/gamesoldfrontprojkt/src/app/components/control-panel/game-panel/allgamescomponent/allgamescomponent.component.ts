import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GameService } from 'src/app/service/game.service';
/**
 * This component displays a table with all games and shortcuts to the functionalities update and remove.
 * Should the user call for one of the functionalities the desired component will be activated with route parameters.
 */
@Component({
  selector: 'app-allgamescomponent',
  templateUrl: './allgamescomponent.component.html',
  styleUrls: ['./allgamescomponent.component.css']
})
export class AllgamescomponentComponent implements OnInit {

  faTrash = faTrash;
  faFile = faFile;
  public gameList: any = [];
  displayedColumns: string[] = ['name', 'price', 'update', 'remove']; 

  /* Upon construction receives a gameService and a router via dependency injection */
  constructor(private gameService: GameService, private route: Router) { }

  /* On component intialization retrieves all games from the server and stores in the local array of games gameList */
  ngOnInit(): void {
    this.gameService.getAllGames().subscribe((data) => {
      this.gameList = data;
    })
  }

/* This method is responsible for verifying where the update component is being called, for it can be called by the button on the game-panel component which in this case
will have the url control-panel/game-panel or it can be called inside the allgamescomponent which provides an update shortcut within the games table which in this case will have the url
controlpanel/game-panel/all-games. After verifying which route the update component is being called by, routes it to the correct route along with the route parameter for updating.*/
  navigateToRouteBySpecificUrlForUpdating(id: String){
    if(this.route.url === '/control-panel/game-panel'){
      const url = `update-game/${id}`;
      this.route.navigateByUrl(`${this.route.url}/${url}`);
    }else if(this.route.url === '/control-panel/game-panel/all-games'){
      const url = `update-game/${id}`;     
      this.route.navigateByUrl(`/control-panel/game-panel/${url}`);
    }
  }

/* This method is responsible for verifying where the delete component is being called, for it can be called by the button on the game-panel component which in this case
will have the url control-panel/game-panel or it can be called inside the allgamescomponent which provides a delete shortcut within the games table which in this case will have the url
controlpanel/game-panel/all-games. After verifying which route the delete component is being called by, routes it to the correct route along with the route parameter for deleting.*/
  navigateToRouteBySpecificUrlForDeleting(id: String){
    if(this.route.url === '/control-panel/game-panel'){
      const url = `remove-game/${id}`;
      this.route.navigateByUrl(`${this.route.url}/${url}`);
    }else if(this.route.url === '/control-panel/game-panel/all-games'){
      const url = `remove-game/${id}`;     
      this.route.navigateByUrl(`/control-panel/game-panel/${url}`);
    }
  }

}

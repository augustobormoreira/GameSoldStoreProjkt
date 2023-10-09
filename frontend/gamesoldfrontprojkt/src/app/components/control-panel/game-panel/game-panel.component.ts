import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { environment } from 'src/environments/environment';
/**
 * This is the game panel component and provides the admin with all necessary functionalities for the game products.
 */
@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent implements OnInit {

  /* Upon construction receives a gameService via dependency injection */
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }


  /* This method is responsible for returning the pdf file for the admin by calling the method getGameReport() from the gameService service */
  downloadGameReport(){
    this.gameService.getGameReport();
  }

}

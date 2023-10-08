import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent implements OnInit {

  constructor(private httpClient: HttpClient, private gameService: GameService) { }

  ngOnInit(): void {
  }

  downloadGameReport(){
    this.gameService.getGameReport();
  }

}

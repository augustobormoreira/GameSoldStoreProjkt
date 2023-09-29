import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GameService } from 'src/app/service/game.service';

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
  constructor(private gameService: GameService, private route: Router) { }

  ngOnInit(): void {
    this.gameService.getAllGames().subscribe((data) => {
      this.gameList = data;
    })
  }


  navigateToRouteBySpecificUrlForUpdating(id: String){
    if(this.route.url === '/control-panel/game-panel'){
      const url = `update-game/${id}`;
      this.route.navigateByUrl(`${this.route.url}/${url}`);
    }else if(this.route.url === '/control-panel/game-panel/all-games'){
      const url = `update-game/${id}`;     
      this.route.navigateByUrl(`/control-panel/game-panel/${url}`);
    }
  }


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

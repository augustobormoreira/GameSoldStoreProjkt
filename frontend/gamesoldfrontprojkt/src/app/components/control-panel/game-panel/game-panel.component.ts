import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  downloadGameReport(){
    this.httpClient.get(`${environment.API_URL}/games/gamesReport`, {responseType: 'blob'}).subscribe((data) => {
      var blob = new Blob([data], {type: 'application/pdf'});

      var downloadUrl = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadUrl;
      link.download = "game_report.pdf";
      link.click();
    })
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  downloadUsersReport(){
    this.httpClient.get(`${environment.API_URL}/users/users_report`, {responseType: 'blob'}).subscribe((data) => {
      var blob = new Blob([data], {type: 'application/pdf'});

      var downloadUrl = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadUrl;
      link.download = "users_report.pdf";
      link.click();
    })
  }

}

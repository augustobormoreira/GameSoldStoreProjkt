import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
/**
 * This is the user panel component and provides the admin with all necessary functionalities for the user products.
 */
@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  /* Upon construction receives a userService via dependency injection */
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  /* This method is responsible for returning the pdf file for the admin by calling the method getUserReport() from the userService service */
  downloadUsersReport(){
    this.userService.getUserReport();
  }

}

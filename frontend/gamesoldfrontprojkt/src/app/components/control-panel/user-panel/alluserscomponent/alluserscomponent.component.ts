import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/service/user.service';
/**
 * This component displays a table with all users and shortcuts to the functionalities update and remove.
 * Should the user call for one of the functionalities the desired component will be activated with route parameters.
 */
@Component({
  selector: 'app-alluserscomponent',
  templateUrl: './alluserscomponent.component.html',
  styleUrls: ['./alluserscomponent.component.css']
})
export class AlluserscomponentComponent implements OnInit {
  faTrash = faTrash;
  faFile = faFile;
  public userList: any = [];
  displayedColumns: string[] = ['name', 'streetnumber', 'housenumber', 'streetname', 'update', 'remove']; 

  /* Upon construction receives a userService and a router via dependency injection */
  constructor(private userService: UserService, private route: Router) { }

  /* On component intialization retrieves all users from the server and stores in the local array of users userList */
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.userList = data;
    })
  }

 /* This method is responsible for verifying where the update component is being called, for it can be called by the button on the user-panel component which in this case
will have the url control-panel/user-panel or it can be called inside the alluserscomponent which provides an update shortcut within the users table which in this case will have the url
control-panel/user-panel/all-users. After verifying which route the update component is being called by, routes it to the correct route along with the route parameter for updating.*/
  navigateToRouteBySpecificUrlForUpdating(role: String, id: String){
    if(this.route.url === '/control-panel/user-panel'){
      const url = `update-user/${role}/${id}`;
      this.route.navigateByUrl(`${this.route.url}/${url}`);
    }else if(this.route.url === '/control-panel/user-panel/all-users'){
      const url = `update-user/${role}/${id}`;     
      this.route.navigateByUrl(`/control-panel/user-panel/${url}`);
    }
  }

/* This method is responsible for verifying where the delete component is being called, for it can be called by the button on the user-panel component which in this case
will have the url control-panel/user-panel or it can be called inside the alluserscomponent which provides a delete shortcut within the users table which in this case will have the url
control-panel/user-panel/all-users. After verifying which route the delete component is being called by, routes it to the correct route along with the route parameter for deleting.*/
  navigateToRouteBySpecificUrlForDeleting(id: String){
    if(this.route.url === '/control-panel/user-panel'){
      const url = `remove-user/${id}`;
      this.route.navigateByUrl(`${this.route.url}/${url}`);
    }else if(this.route.url === '/control-panel/user-panel/all-users'){
      const url = `remove-user/${id}`;     
      this.route.navigateByUrl(`/control-panel/user-panel/${url}`);
    }
  }
}

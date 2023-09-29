import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/service/user.service';

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
  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.userList = data;
    })
  }


  navigateToRouteBySpecificUrlForUpdating(role: String, id: String){
    if(this.route.url === '/control-panel/user-panel'){
      const url = `update-user/${role}/${id}`;
      this.route.navigateByUrl(`${this.route.url}/${url}`);
    }else if(this.route.url === '/control-panel/user-panel/all-users'){
      const url = `update-user/${role}/${id}`;     
      this.route.navigateByUrl(`/control-panel/user-panel/${url}`);
    }
  }


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

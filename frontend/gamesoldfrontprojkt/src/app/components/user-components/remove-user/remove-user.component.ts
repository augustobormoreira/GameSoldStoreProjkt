import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
/**
 * This component is responsible for the removal of an user, should an admin of the system decide to.
 */
@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {
  routeId!: string | null;
  userForm: FormGroup =  new FormGroup({
    userId: new FormControl()
  });
  
  /* Injects an httpClient, activatedRoute and userService via dependency injection */
  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private userService: UserService) {}
  
  /* On component initialization retrieves the route parameter ID, even if it doesnt exist which in this case should get a null value. Afterwards it fills the formcontrol
  userId with the routeId value.*/
  ngOnInit(): void {
   this.routeId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  /* Calls for the method deleteExistingEmployee from the userService and sends the userID value */
  deleteExistingUser() {
    this.userService.deleteExistingEmployee(Number.parseInt(this.userForm.get('userId')?.value));
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

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
  
  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private userService: UserService) {}
  
  ngOnInit(): void {
   this.routeId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  deleteExistingUser() {
    this.userService.deleteExistingEmployee(Number.parseInt(this.userForm.get('userId')?.value));
  }

}

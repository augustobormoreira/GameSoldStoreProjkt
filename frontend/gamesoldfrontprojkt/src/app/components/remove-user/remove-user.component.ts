import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {

  @ViewChild('content') content: any;
  private closeResult!: String;
  userForm: FormGroup = new FormGroup({
    userId: new FormControl()
  });
  
  constructor(private httpClient: HttpClient, private modalService: NgbModal, private userService: UserService, public dialogRef: MatDialogRef<RemoveUserComponent>) { }
  
  ngOnInit(): void {
  }

  deleteExistingUser() {
    this.userService.deleteExistingEmployee(Number.parseInt(this.userForm.get('userId')?.value));
  }

  closeDialog(){
    this.dialogRef.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { UserClient } from '../../model/UserClient';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  clientForm: FormGroup = new FormGroup({
    userRName: new FormControl(),
    userStreetNumber: new FormControl(),
    userHomeNumber: new FormControl(),
    userStreetName: new FormControl(),
    userUName: new FormControl(),
    userPassword: new FormControl(),
    preferredPaymentMethod: new FormControl()
  });
  passwordHide = true;
  constructor(public dialogRef: MatDialogRef<RegisterUserComponent>, private userService: UserService) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  addNewUser(){
    const newClient = this.createClient();
    console.log(this.userService.addNewClient(newClient));
  }

  createClient(){
    const newClient: UserClient =  new UserClient(
      this.clientForm.get('userRName')?.value,
      this.clientForm.get('userStreetNumber')?.value,
      this.clientForm.get('userHomeNumber')?.value,
      this.clientForm.get('userStreetName')?.value,
      this.clientForm.get('userUName')?.value,
      this.clientForm.get('userPassword')?.value,
      "Client",
      this.clientForm.get('preferredPaymentMethod')?.value,
      false,
      0
    );
    return newClient;
  }

}

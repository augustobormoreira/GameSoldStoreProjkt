import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { UserClient } from '../../model/UserClient';
/**
 * This component is reponsible for a user registering himself on the website. This component is opened as a dialog.
 */
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
  /* Upon contruction, injects via dependecy injection a reference of dialogRef and a userService */
  constructor(public dialogRef: MatDialogRef<RegisterUserComponent>, private userService: UserService) { }

  ngOnInit(): void {
  }

  /* Simple method to call the method close() of dialogRef, in case the user decides to not register. */
  closeDialog(){
    this.dialogRef.close();
  }

  /* Upon submit of the registration form, it creates a new client with the formcontrol values and calls for the method addNewClient from the service userService */
  addNewUser(){
    const newClient = this.createClient();
    console.log(this.userService.addNewClient(newClient));
  }

  /* This method returns a new client from the registration form values. The client registered by a new non-registered user on the website begins with a debt of zero. */
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

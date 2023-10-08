import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserClient } from '../../model/UserClient';
import { UserEmployee } from '../../model/UserEmployee';

/**
 * This component is responsible for the adding of a new user, either employee or client to the server
 */
@Component({
  selector: 'app-add-newuser',
  templateUrl: './add-newuser.component.html',
  styleUrls: ['./add-newuser.component.css']
})
export class AddNewuserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    userRName: new FormControl(),
    userStreetNumber: new FormControl(),
    userHomeNumber: new FormControl(),
    userStreetName: new FormControl(),
    userUName: new FormControl(),
    userType: new FormControl(),
    userPassword: new FormControl(),
    preferredPaymentMethod: new FormControl(),
    clientIsBlacklisted: new FormControl(),
    clientDebt: new FormControl(),
    jobRole: new FormControl(),
    empSalary: new FormControl()
  });
  passwordHide = true;
  constructor(private userService: UserService) {

   }

  ngOnInit(): void {
  }

  /* Simple method to check if the formControl userType informed by the user is a client */
  isClient(){
    if(this.userForm.get('userType')?.value==="client") return true;
    return false;
  }

  /* Simple method to check if the formControl userType informed by the user is an employee */
  isEmployee(){
    if(this.userForm.get('userType')?.value==="employee") return true;
    return false;
  }
  
 /* Upon submit of the user register form, this method is called. It uses the functions isClient and isEmployee to create the apropriate type of user and calls
 the specified method to add the user. */
  addNewUser(){
    if(this.isEmployee()){
      const newEmployee = this.createEmployee();
      this.addNewEmployee(newEmployee);
    }
    else if(this.isClient()){
      const newClient = this.createClient();
      this.addNewClient(newClient);
    }
  }

/* This method adds an employee */
  addNewEmployee(employee: UserEmployee){
    console.log(this.userService.addNewEmployee(employee));
  }
/* This method adds a client */
  addNewClient(client: UserClient){
    console.log(this.userService.addNewClient(client));
  }

  /* This method returns a client using the information on the form filled by the user */
  createClient(){
    const newClient: UserClient =  new UserClient(
      this.userForm.get('userRName')?.value,
      this.userForm.get('userStreetNumber')?.value,
      this.userForm.get('userHomeNumber')?.value,
      this.userForm.get('userStreetName')?.value,
      this.userForm.get('userUName')?.value,
      this.userForm.get('userPassword')?.value,
      "Client",
      this.userForm.get('preferredPaymentMethod')?.value,
      this.userForm.get('clientIsBlacklisted')?.value,
      this.userForm.get('clientDebt')?.value
    );
    return newClient;
  }

  /* This method returns an employee using the information on the form filled by the user */
  createEmployee(){
    const newEmployee: UserEmployee =  new UserEmployee(
      this.userForm.get('userRName')?.value,
      this.userForm.get('userStreetNumber')?.value,
      this.userForm.get('userHomeNumber')?.value,
      this.userForm.get('userStreetName')?.value,
      this.userForm.get('userUName')?.value,
      this.userForm.get('userPassword')?.value,
      "Employee",
      this.userForm.get('jobRole')?.value,
      this.userForm.get('empSalary')?.value
    );

    return newEmployee;
  }


}

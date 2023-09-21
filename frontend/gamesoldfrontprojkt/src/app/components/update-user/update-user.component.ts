import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { User } from '../model/User';
import { UserClient } from '../model/UserClient';
import { UserEmployee } from '../model/UserEmployee';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    userId: new FormControl(),
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
  shouldButtonNotBeEnabled = true;

  selectUserToUpdate(){
    this.userService.getUserById(this.userForm.get('userId')?.value).subscribe((result) => {
      if(this.isEmployee()){
        this.shouldButtonNotBeEnabled = false;
        this.setUserFormWithUserProperties(result);
        this.setUserFormWithEmployeeProperties(<UserEmployee> result);
      }else if(this.isClient()){
        this.shouldButtonNotBeEnabled = false;
        this.setUserFormWithUserProperties(result);
        this.setUserFormWithClientProperties(<UserClient> result);
      }
    });
  }

  updateConfirmedUser(){  
      if(this.isClient()){
        const updatedClient = this.createClient();
        this.userService.updateExistingClient(this.userForm.get('userId')?.value, updatedClient);
      }else if(this.isEmployee()){
        const updatedEmployee = this.createEmployee();
        this.userService.updateExistingEmployee(this.userForm.get('userId')?.value, updatedEmployee);
      }
  }

  isClient(){
    if(this.userForm.get('userType')?.value==="client") return true;
    return false;
  }

  isEmployee(){
    if(this.userForm.get('userType')?.value==="employee") return true;
    return false;
  }

  closeDialog(){
    this.dialogRef.close();
  }

  setUserFormWithUserProperties(user: User) {
    this.userForm.get('userRName')?.setValue(user.name);
    this.userForm.get('userStreetNumber')?.setValue(user.streetNumber);
    this.userForm.get('userHomeNumber')?.setValue(user.houseNumber);
    this.userForm.get('userStreetName')?.setValue(user.streetName);
    this.userForm.get('userUName')?.setValue(user.username);
    this.userForm.get('userPassword')?.setValue(user.password);
  }

  setUserFormWithClientProperties(user: UserClient){
    this.userForm.get('userType')?.value === "client";
    this.userForm.get('preferredPaymentMethod')?.setValue(user.preferredPaymentMethod);
    if(user.clientIsBlacklisted){
      this.userForm.get('clientIsBlacklisted')?.setValue("true");
    }else{
      this.userForm.get('clientIsBlacklisted')?.setValue("false");
    }
    this.userForm.get('clientDebt')?.setValue(user.clientDebt);
  }

  setUserFormWithEmployeeProperties(user: UserEmployee){
    this.userForm.get('userType')?.value === "employee";
    this.userForm.get('jobRole')?.setValue(user.jobRole);
    this.userForm.get('empSalary')?.setValue(user.salary);
  }

  buttonEnabler(){
    return this.shouldButtonNotBeEnabled;
  }

  disableButton(){
    this.shouldButtonNotBeEnabled = true;
  }

  createClient(){
    const newClient: UserClient =  new UserClient(
      this.userForm.get('userRName')?.value,
      this.userForm.get('userStreetNumber')?.value,
      this.userForm.get('userHomeNumber')?.value,
      this.userForm.get('userStreetName')?.value,
      this.userForm.get('userUName')?.value,
      this.userForm.get('userPassword')?.value,
      this.userForm.get('preferredPaymentMethod')?.value,
      this.userForm.get('clientIsBlacklisted')?.value,
      this.userForm.get('clientDebt')?.value
    );
    return newClient;
  }

  createEmployee(){
    const newEmployee: UserEmployee =  new UserEmployee(
      this.userForm.get('userRName')?.value,
      this.userForm.get('userStreetNumber')?.value,
      this.userForm.get('userHomeNumber')?.value,
      this.userForm.get('userStreetName')?.value,
      this.userForm.get('userUName')?.value,
      this.userForm.get('userPassword')?.value,
      this.userForm.get('jobRole')?.value,
      this.userForm.get('empSalary')?.value
    );

    return newEmployee;
  }


  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>, private userService: UserService) { }

  ngOnInit(): void {
  }

}



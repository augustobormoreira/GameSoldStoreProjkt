import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { UserEmployee } from '../model/UserEmployee';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../model/User';
import { UserClient } from '../model/UserClient';

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


  @ViewChild('addUser') addUser: any;
  private _closeResult!: string;
  passwordHide = true;
  constructor(public dialogRef: MatDialogRef<AddNewuserComponent>, private userService: UserService) {

   }

  ngOnInit(): void {
  }

  isClient(){
    if(this.userForm.get('userType')?.value==="client") return true;
    return false;
  }

  isEmployee(){
    if(this.userForm.get('userType')?.value==="employee") return true;
    return false;
  }
  

  addNewUser(){
    if(this.isEmployee()){
      const newEmployee = this.createEmployee();
      this.addNewEmployee(newEmployee);
    }
    else if(this.isClient()){
      const newClient = this.createClient();
      this.addNewClient(newClient);
    }
    this.closeDialog();
  }


  addNewEmployee(employee: UserEmployee){
    console.log(this.userService.addNewEmployee(employee));
  }

  addNewClient(client: UserClient){
    console.log(this.userService.addNewClient(client));
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

  closeDialog() {
    this.dialogRef.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../model/User';
import { UserClient } from '../../model/UserClient';
import { UserEmployee } from '../../model/UserEmployee';
import { ActivatedRoute, Router } from '@angular/router';
/**
 * This component is responsible for the updating of a user, should an admin decide to.
 */
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  routeUserType!: string | null;
  routeUserId!: string | null;
  userForm: FormGroup = new FormGroup({
    userId: new FormControl(),
    userRName: new FormControl(),
    userStreetNumber: new FormControl(),
    userHomeNumber: new FormControl(),
    userStreetName: new FormControl(),
    userUName: new FormControl(),
    userType: new FormControl(),
    userPassword: new FormControl(),
    clientIsBlacklisted: new FormControl(),
    clientDebt: new FormControl(),
    jobRole: new FormControl(),
    empSalary: new FormControl()
  });
  passwordHide = true;
  shouldButtonNotBeEnabled = true;
  
  /* Injects a userService, activatedRoute and router via dependency injection */
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { 
   }
/* On component initialization, retrieves the userID sent via route even it doesn't exist. Fills the formControls userId and userType with the route parameters id and role.
  Afterwards a verification is called, if role isn't null and equals ADMIN the userType formcontrol and routeUserType is set with the value employee and calls for the method
  selectUserToUpdate, and if the role isn't null and equals USER, the userType formcontrol and routeUserType is set with the value client and also calls for the method
  selectUserToUpdate
   */
  ngOnInit(): void {
    this.routeUserId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userForm.get('userId')?.setValue(this.activatedRoute.snapshot.paramMap.get('id'));
    this.userForm.get('userType')?.setValue(this.activatedRoute.snapshot.paramMap.get('role'));
    if(this.activatedRoute.snapshot.paramMap.get('role') === 'ADMIN' && (this.activatedRoute.snapshot.paramMap.get('role')!=null || this.activatedRoute.snapshot.paramMap.get('id') != null)){
      this.userForm.get('userType')?.setValue('employee');
      this.routeUserType = 'employee';
      this.selectUserToUpdate();
    }else if(this.activatedRoute.snapshot.paramMap.get('role') === 'USER'  && (this.activatedRoute.snapshot.paramMap.get('role')!=null || this.activatedRoute.snapshot.paramMap.get('id') != null)){
      this.userForm.get('userType')?.setValue('client');
      this.routeUserType = 'client';
      this.selectUserToUpdate();
    }
  }

  /* This method calls the for method getUserById from userService using the userId formcontrol value. After retrieval of the result depending on the results of the methods
  isEmployee and isClient fills the form with specified properties. */
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

  /* Depending if the formControl userType is client or employee, a new employee or client is created using the formcontrol values and afterwars calls for the methods
  updateExistingClient or updateExistingEmployee which requires the userId and the newly created client or employee as parameters */
  updateConfirmedUser(){  
      if(this.isClient()){
        const updatedClient = this.createClient();
        console.log(updatedClient);
        this.userService.updateExistingClient(this.userForm.get('userId')?.value, updatedClient);
      }else if(this.isEmployee()){
        const updatedEmployee = this.createEmployee();
        this.userService.updateExistingEmployee(this.userForm.get('userId')?.value, updatedEmployee);
      }
  }

  /* Simple method to check if userType is client */
  isClient(){
    if(this.userForm.get('userType')?.value==="client") return true;
    return false;
  }

  /* Simple method to check if userType is employee*/
  isEmployee(){
    if(this.userForm.get('userType')?.value==="employee") return true;
    return false;
  }

  /* This method fills the formcontrol values of USER */
  setUserFormWithUserProperties(user: User) {
    this.userForm.get('userRName')?.setValue(user.name);
    this.userForm.get('userStreetNumber')?.setValue(user.streetNumber);
    this.userForm.get('userHomeNumber')?.setValue(user.houseNumber);
    this.userForm.get('userStreetName')?.setValue(user.streetName);
    this.userForm.get('userUName')?.setValue(user.username);
    this.userForm.get('userPassword')?.setValue(user.password);
  }

  /* This method fills the formcontrol values of CLIENT */
  setUserFormWithClientProperties(user: UserClient){
    this.userForm.get('userType')?.value === "client";
    if(user.clientIsBlacklisted){
      this.userForm.get('clientIsBlacklisted')?.setValue("true");
    }else{
      this.userForm.get('clientIsBlacklisted')?.setValue("false");
    }
    this.userForm.get('clientDebt')?.setValue(user.clientDebt);
  }

  /* This method fills the formcontrol values of EMPLOYEE/ADMIN */
  setUserFormWithEmployeeProperties(user: UserEmployee){
    this.userForm.get('userType')?.value === "employee";
    this.userForm.get('jobRole')?.setValue(user.jobRole);
    this.userForm.get('empSalary')?.setValue(user.salary);
  }

  /* Enables the button for form submit */
  buttonEnabler(){
    return this.shouldButtonNotBeEnabled;
  }

  /* Disables the button for form submit */
  disableButton(){
    this.shouldButtonNotBeEnabled = true;
  }

  /* Returns new client using form control values */
  createClient(){
    const newClient: UserClient =  new UserClient(
      this.userForm.get('userRName')?.value,
      this.userForm.get('userStreetNumber')?.value,
      this.userForm.get('userHomeNumber')?.value,
      this.userForm.get('userStreetName')?.value,
      this.userForm.get('userUName')?.value,
      this.userForm.get('userPassword')?.value,
      "Client",
      this.userForm.get('clientIsBlacklisted')?.value,
      this.userForm.get('clientDebt')?.value
    );
    return newClient;
  }

  /* Return new employee using form control values */
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



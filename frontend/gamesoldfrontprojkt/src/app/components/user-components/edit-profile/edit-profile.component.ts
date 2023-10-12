import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenInfo } from 'src/app/service/tokeninfo';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../model/User';
import { UserClient } from '../../model/UserClient';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userUpdateForm: FormGroup = new FormGroup({
    user_name: new FormControl(),
    userStreetNumber: new FormControl(),
    userHomeNumber: new FormControl(),
    userStreetName: new FormControl(),
    uName: new FormControl(),
    userPassword: new FormControl(),
    verifyPassword: new FormControl()
  });
  constructor(private userService: UserService, private tokenInfo: TokenInfo) { }

  ngOnInit(): void {
    const user_id = this.tokenInfo.decodeJWT().userIdAndName[0];
    this.userService.getUserById(user_id).subscribe((user) => {
      this.userUpdateForm.get('user_name')?.setValue(user.name);
      this.userUpdateForm.get('userStreetNumber')?.setValue(user.streetNumber);
      this.userUpdateForm.get('userHomeNumber')?.setValue(user.houseNumber);
      this.userUpdateForm.get('userStreetName')?.setValue(user.streetName);
      this.userUpdateForm.get('uName')?.setValue(user.username);
      this.userUpdateForm.get('userPassword')?.setValue(user.password);
      this.userUpdateForm.get('verifyPassword')?.setValue(user.password);
    });
  }

  updateUser(){
    if(this.verifyPassword()){
      const user_id = this.tokenInfo.decodeJWT().userIdAndName[0];
      const userToBeUpdated : UserClient =  this.createNewUserFromUserForm();
      console.log(userToBeUpdated);
      this.userService.updateExistingClient( user_id, userToBeUpdated);
    }else{
      alert("Passwords must match!!")
    }
  }

  createNewUserFromUserForm(){
    return new UserClient(
      this.userUpdateForm.get('user_name')?.value,
      this.userUpdateForm.get('userStreetNumber')?.value,
      this.userUpdateForm.get('userHomeNumber')?.value,
      this.userUpdateForm.get('userStreetName')?.value,
      this.userUpdateForm.get('uName')?.value,
      this.userUpdateForm.get('userPassword')?.value,
      "Client",
      false,
      0
    );
  }

  verifyPassword() : boolean {
    return (this.userUpdateForm.get('userPassword')?.value === this.userUpdateForm.get('verifyPassword')?.value);
  }
}

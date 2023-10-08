import { Component, OnInit } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/service/login.service';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { UserDTO } from '../model/UserDTO';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { TokenInfo } from 'src/app/service/tokeninfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faLock = faLock;
  userRequest!: UserDTO;
  login!: String;
  password!: String;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted: boolean = false;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private route: Router, private tokenInfo: TokenInfo) {
    
   }


  /* Check if there is already someone logged in on init, if not create the formgroup and proceeds normally */
  ngOnInit(): void {

    if(this.verifyIfUserisAlreadyLoggedIn()){
      return;
    }

    this.loginForm = this.formBuilder.group({
      username: "",
      password: ""
    })
  }

  /* On loginForm submit create a new UserDTO to send to the backend, if succesful, create the item sessionToken for the user to navigate with and 
  redirect him to the normal store if it is a CLIENT, if it is an employee redirect to CONTROL PANEL */
  onSubmit(): void{
    this.login = this.loginForm.get('username')?.value;
    this.password = this.loginForm.get('password')?.value;

    this.userRequest = new UserDTO(this.login, this.password);

    this.loginService.loginUser(this.userRequest).subscribe((res: any) => {
      sessionStorage.setItem('sessionToken', res.token);

      if(this.userIsAdmin()){
        this.route.navigateByUrl('/control-panel');
      }else{
        this.route.navigateByUrl('/product-list');
      }
    })
  }

  /* Decode json web token received from the backend to see if the logged in user is an ADMIN */
  userIsAdmin(): boolean {
    const userToken = this.tokenInfo.decodeJWT();
    if(userToken != null && userToken.userIdAndName[1]=="ADMIN"){
      return true;
    }

    return false;
  }

  /* Check if there is already an item named sessionToken in sessionStorage, if there is it means there's already a user logged in */
  verifyIfUserisAlreadyLoggedIn(): boolean{
    if(sessionStorage.getItem('sessionToken') == null) return false;

    return true;
  }

}

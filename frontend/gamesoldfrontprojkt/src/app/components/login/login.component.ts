import { Component, OnInit } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/service/login.service';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { UserDTO } from '../model/game/UserDTO';
import { Router } from '@angular/router';

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

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private route: Router) {
    
   }

  ngOnInit(): void {

    if(this.verifyIfUserisAlreadyLoggedIn()){
      return;
    }

    this.loginForm = this.formBuilder.group({
      username: "",
      password: ""
    })
  }

  onSubmit(): void{
    this.login = this.loginForm.get('username')?.value;
    this.password = this.loginForm.get('password')?.value;

    this.userRequest = new UserDTO(this.login, this.password);

    console.log(this.loginService.loginUser(this.userRequest).subscribe((res: any) => {
      localStorage.setItem('sessionToken', res.token);
      this.route.navigateByUrl('/product-list');
    }));

  }

  verifyIfUserisAlreadyLoggedIn(): boolean{
    if(localStorage.getItem('sessionToken') == null) return false;

    return true;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
/**
 * This is the control panel component. It can only be accessed by admins and it provides an interface for the system control.
 * This panel provides other 3 sub-panels which represent the user, order and games.
 */
@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  /* Upon construction, receives a loginService and a router via dependency injection */
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  /* This method logs out the user by calling the method logoutUser from the loginService and immediately redirects to the login page. */
  logOutUserAndRedirectToLoginPage(){
    this.loginService.logoutUser();
    this.router.navigateByUrl('/user-login')
  }

}

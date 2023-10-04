import { Component, OnInit, ViewChild } from '@angular/core';
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { CartserviceService } from 'src/app/service/cartservice.service';
import { SearchGameService } from 'src/app/service/searchGame.service';
import jwtDecode from 'jwt-decode';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { RegisterUserComponent } from '../../user-components/register-user/register-user.component';
import { LoginService } from 'src/app/service/login.service';
import { RegisterUserCardComponent } from '../../user-components/register-user-card/register-user-card.component';
@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  faCartPlus = faCartPlus;

  public totalCartItems: number = 0;
  constructor(private cartService: CartserviceService, private searchGameService: SearchGameService, public dialog: MatDialog, private httpClient: HttpClient, private loginService: LoginService){};

  openModal(modalName: string){
     if(modalName === 'register-user'){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.id = 'modal-registeruser';
        dialogConfig.height = '800px';
        dialogConfig.width = '1000px';
        const dialogRef = this.dialog.open(RegisterUserComponent, dialogConfig);
      } else if(modalName === 'register-card'){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.id = 'modal-registercard';
        dialogConfig.height = '800px';
        dialogConfig.width = '1000px';
        const dialogRef = this.dialog.open(RegisterUserCardComponent, dialogConfig);
      }

    }
  

  ngOnInit(): void {
    
    this.cartService.getProductList()
      .subscribe(res => {
        this.totalCartItems = res.length;
      })
    
    this.cartService.cartItemRemovedTriggerEvent.subscribe((data) => {
      this.totalCartItems = data;
    })

  }

  searchGameName(searchedNameGame: HTMLInputElement): void {
    this.searchGameService.setValueToBeSearched(searchedNameGame);
  }

  userIsAdmin(): boolean {
    const userToken = this.decodeJWT();
    if(userToken != null && userToken.userIdAndName[1]=="ADMIN"){
      return true;
    }

    return false;
  }

  checkIfUserIsNotLoggedIn(): boolean{
    return (sessionStorage.getItem('sessionToken') == null);
  }

  logOutUserAndRedirectToLoginPage(){
    this.loginService.logoutUser();
  }

  decodeJWT(): any{
    try {
      return jwtDecode(sessionStorage.getItem('sessionToken')!);
    }catch(Error){
      return null;
    }
  }
  

}

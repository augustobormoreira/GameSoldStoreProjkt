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
import { TokenInfo } from 'src/app/service/tokeninfo';
/**
 * This is the navbar component that will be displayed during all times when a user of type client is logged in, or when the website is loaded without any user logged in.
 */
@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  faCartPlus = faCartPlus;
  userName: string = "";

  /*This variable is responsible for the counting of all games added into the cart since we want the user to see on his interface the ammount of games he has added into
  the cart already. */
  public totalCartItems: number = 0;

  /* Upon construction, receives a cartService, searchGameService, matDialog and loginService via dependecy injection */
  constructor(private cartService: CartserviceService, private searchGameService: SearchGameService, public dialog: MatDialog, private httpClient: HttpClient, private loginService: LoginService, private tokenInfo: TokenInfo){};


  /* This method opens a MatDialog component based on the information received from the user, if the user desires to register himself in the website, then the
  RegisterUserComponent is opened, or after a user is logged in and he desires to register a card as new payment method, the RegisterUserCardComponent is opened */
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
  

    /* Upon initialization of the component, we use the method getProductList from the cartService to check the ammount of products already added into the cart
    and also subscribe to the cartItemRemovedTriggerEvent from the cartService service to always keep the correct number of products into the cart being displayed. */
  ngOnInit(): void {
    this.userName = this.tokenInfo.decodeJWT().sub;
    this.cartService.getProductList()
      .subscribe(res => {
        this.totalCartItems = res.length;
      })
    
    this.cartService.cartItemRemovedTriggerEvent.subscribe((data) => {
      this.totalCartItems = data;
    })

  }

  /* This method sets the name type by the user to be searched, and saves it into the searchGameService using the method setValueToBeSearched */
  searchGameName(searchedNameGame: HTMLInputElement): void {
    this.searchGameService.setValueToBeSearched(searchedNameGame);
  }

  /* This method checks if the user is admin by verifying the property userIdAndName stored in the sessionToken on sessionStorage */
  userIsAdmin(): boolean {
    const userToken = this.tokenInfo.decodeJWT();
    if(userToken != null && userToken.userIdAndName[1]=="ADMIN"){
      return true;
    }

    return false;
  }

  /* This method checks if there is a user logged in by verifying if there is a sessionToken in the sessionStorage */
  checkIfUserIsNotLoggedIn(): boolean{
    return (sessionStorage.getItem('sessionToken') == null);
  }

  /* This method is responsible for logging out a user should he decide to, it calls the method logoutUser from the service loginService */
  logOutUserAndRedirectToLoginPage(){
    this.loginService.logoutUser();
  }
  

}

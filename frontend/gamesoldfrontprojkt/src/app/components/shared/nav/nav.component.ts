import { Component, OnInit, ViewChild } from '@angular/core';
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { CartserviceService } from 'src/app/service/cartservice.service';
import { SearchGameService } from 'src/app/service/searchGame.service';
import jwtDecode from 'jwt-decode';
import { AddProductComponent } from '../../add-product/add-product.component';
import { RemoveProductComponent } from '../../remove-product/remove-product.component';
import { AddNewuserComponent } from '../../add-newuser/add-newuser.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { UserEmployee } from '../../model/UserEmployee';
import { User } from '../../model/User';
import { environment } from 'src/environments/environment';
import { RemoveUserComponent } from '../../remove-user/remove-user.component';
import { UpdateProductComponent } from '../../update-product/update-product.component';
import { UpdateUserComponent } from '../../update-user/update-user.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  faCartPlus = faCartPlus;

  public totalCartItems: number = 0;
  constructor(private cartService: CartserviceService, private searchGameService: SearchGameService, public dialog: MatDialog, private httpClient: HttpClient){};

  openModal(modalName: string){
    if(modalName === 'addproduct'){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.id = 'modal-addproduct';
      dialogConfig.height = '800px';
      dialogConfig.width = '1000px';
      const dialogRef = this.dialog.open(AddProductComponent, dialogConfig);
    }else if(modalName === 'removeproduct'){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.id = 'modal-removeproduct';
      dialogConfig.height = '300px';
      dialogConfig.width = '500px';
      const dialogRef = this.dialog.open(RemoveProductComponent, dialogConfig);
    }else if(modalName === 'updateproduct'){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.id = 'modal-updateproduct';
      dialogConfig.height = '800px';
      dialogConfig.width = '1000px';
      const dialogRef = this.dialog.open(UpdateProductComponent, dialogConfig);
    }else if(modalName === 'empreport'){
      this.httpClient.get(`${environment.API_URL}/users/allEmpsToPdf`, {responseType: 'blob'}).subscribe((data) => {
        var blob = new Blob([data], {type: 'application/pdf'});

        var downloadUrl = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadUrl;
        link.download = "relatorio.pdf";
        link.click();
      })
    }else if(modalName === 'clireport'){
      this.httpClient.get(`${environment.API_URL}/users/allCliToPdf`, {responseType: 'blob'}).subscribe((data) => {
        var blob = new Blob([data], {type: 'application/pdf'});

        var downloadUrl = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadUrl;
        link.download = "relatorio.pdf";
        link.click();
      })
    }else if(modalName === 'productreport'){
      this.httpClient.get(`${environment.API_URL}/games/gamesReport`, {responseType: 'blob'}).subscribe((data) => {
        var blob = new Blob([data], {type: 'application/pdf'});

        var downloadUrl = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadUrl;
        link.download = "relatorio.pdf";
        link.click();
      })
    }
    else if(modalName === 'adduser'){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.id = 'modal-adduser';
      dialogConfig.height = '800px';
      dialogConfig.width = '1000px';
      const dialogRef = this.dialog.open(AddNewuserComponent, dialogConfig);
      }else if(modalName === 'remove-user'){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.id = 'modal-removeuser';
        dialogConfig.height = '300px';
        dialogConfig.width = '500px';
        const dialogRef = this.dialog.open(RemoveUserComponent, dialogConfig);
      }else if(modalName === 'update-user'){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.id = 'modal-updateuser';
        dialogConfig.height = '800px';
        dialogConfig.width = '1000px';
        const dialogRef = this.dialog.open(UpdateUserComponent, dialogConfig);
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

  decodeJWT(): any{
    try {
      return jwtDecode(sessionStorage.getItem('sessionToken')!);
    }catch(Error){
      return null;
    }
  }
  

}

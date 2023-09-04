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

@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  faCartPlus = faCartPlus;
  @ViewChild('addProductModal') addProductModal!: AddProductComponent;
  @ViewChild('removeProductModal') removeProductModal!: RemoveProductComponent;

  public totalCartItems: number = 0;
  constructor(private cartService: CartserviceService, private searchGameService: SearchGameService, public dialog: MatDialog, private httpClient: HttpClient){};

  openModal(modalName: string){
    if(modalName === 'addproduct'){
      this.addProductModal.openModalService();
    }else if(modalName === 'removeproduct'){
      this.removeProductModal.openModalService();
    }else if(modalName === 'adduser'){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.id = 'modal-adduser';
      dialogConfig.height = '800px';
      dialogConfig.width = '1000px';
      const dialogRef = this.dialog.open(AddNewuserComponent, dialogConfig);
      }

    }
  

  ngOnInit(): void {
    
    this.cartService.getProductList()
      .subscribe(res => {
        this.totalCartItems = res.length;
      })
      
  }

  searchGameName(searchedNameGame: HTMLInputElement): void {
    this.searchGameService.setValueToBeSearched(searchedNameGame);
  }

  userIsAdmin(): boolean {
    const userToken = this.decodeJWT();
    if(userToken != null && userToken.role=="ADMIN"){
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

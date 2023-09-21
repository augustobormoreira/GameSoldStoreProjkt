import { Component, OnInit, ViewChild } from '@angular/core';
import { CartserviceService } from 'src/app/service/cartservice.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatTable } from '@angular/material/table';
import { OrderDTO } from '../model/OrderDTO';
import { Game } from '../model/Game';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  faTrash = faTrash;
  purchaseEnded: boolean = false;
  cardFormMustOpen = false;
  public productList: any = [];
  public totalPrice: number = 0;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ['name', 'price', 'description', 'tags', 'remove']; 

  constructor(private cartService: CartserviceService) { }

  ngOnInit(): void {
    this.cartService.getProductList()
    .subscribe(res => {
      this.productList = res;
      this.totalPrice = this.cartService.getTotalPrice();
    })
  }

  removeItem(product: any){
    this.cartService.removeCartItem(product);
    this.table.renderRows();
  }

  removeAllItems(){
    this.cartService.removeAllItems();
  }

  finalizeCartPhase(){
    this.openFormToGetCardInformation();
  }

  createNewArrayWithProductsIds(): Array<string>{
    let newArray: Array<string> = new Array();;
    for(let i = 0; i < this.productList.length; i++){
      newArray.push(this.productList[i].productId);
    }
    return newArray;
  }

  openFormToGetCardInformation(){
    this.cardFormMustOpen = true;
  }

  addNewOrder(){
    const arrayWithProductsIds: Array<string> = this.createNewArrayWithProductsIds();
    const userName: string = this.decodeJWT().userIdAndName[0];
    const newOrder = new OrderDTO(userName, arrayWithProductsIds);
    this.removeAllItems();
    this.cartService.addNewOrder(newOrder);
    this.purchaseEnded = true;
  }

  decodeJWT(): any{
    try {
      return jwtDecode(sessionStorage.getItem('sessionToken')!);
    }catch(Error){
      return null;
    }
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../components/model/Game';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {
  public myCart: any = [];
  isRemoved: boolean = false;
  public productList = new BehaviorSubject<any>([]);

  getProductList(){
    return this.productList.asObservable();
  }

  setProduct(product: any){
    this.myCart.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any){
    this.myCart.push(product);
    this.productList.next(this.myCart);
    this.getTotalPrice();
  }

  getTotalPrice(){
    let totalAmmount = 0;
    this.myCart.map((cartItem: any) => {
      totalAmmount += cartItem.productPrice;
    })

    return totalAmmount;
  }

  removeCartItem(product: Game){
    this.myCart.map((cartItem: any, index:any) => {
      if(product.productName.localeCompare(cartItem.productName) == 0 && !this.isRemoved){
        this.myCart.splice(index, 1);
        this.isRemoved = true;
      }
    })
  }

  removeAllItems(){
    this.myCart = [];
    this.productList.next(this.myCart);
  }

  

  constructor() { }
}

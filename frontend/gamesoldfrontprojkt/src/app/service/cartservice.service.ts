import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../components/model/Game';
import { HttpClient } from '@angular/common/http';
import { OrderDTO } from '../components/model/OrderDTO';
import { environment } from 'src/environments/environment';
import { OrderService } from './order.service';

/* Service responsible for all cart methods related, receives an httpClient via dependency injection */
@Injectable({
  providedIn: 'root'
})
export class CartserviceService {
  public myCart: Array<Game> = [];
  isRemoved: boolean = false;
  public productList = new BehaviorSubject<Array<Game>>([]);
  @Output() cartItemRemovedTriggerEvent = new EventEmitter<number>();


  /* This method returns the productList as an observable for other components to subscribe to */
  getProductList(){
    return this.productList.asObservable();
  }

  /* This method receives a product and adds it into the cart and pushes the cart into the behaviourSubject productList */
  addToCart(product: Game){
    this.myCart.push(product);
    this.productList.next(this.myCart);
    this.getTotalPrice();
  }

  getTotalPrice(){
    let totalAmmount = 0;
    this.myCart.map((cartItem: Game) => {
      totalAmmount += cartItem.productPrice;
    })

    return totalAmmount;
  }

  removeCartItem(product: Game){
    this.myCart.map((cartItem: Game, index: number) => {
      if(product.productName.localeCompare(cartItem.productName) == 0 && !this.isRemoved){
        this.myCart.splice(index, 1);
        this.isRemoved = true;
        this.cartItemRemovedTriggerEvent.emit(this.myCart.length);
      }
    })

    this.isRemoved = false;
  }

  removeAllItems(){
    this.myCart = [];
    this.productList.next(this.myCart);
  }

  

  constructor(private orderService: OrderService) { }


  /* This is a post method. Receives an OrderDTO as parameter and sends it to be added into the database */
  addNewOrder(orderDTO: OrderDTO){
    this.orderService.addNewOrder(orderDTO);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDTO } from '../components/model/OrderDTO';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from '../components/model/Order';
import { Game } from '../components/model/Game';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  /* This is a post method. Receives an OrderDTO as parameter and sends it to be added into the database */
  addNewOrder(orderDTO: OrderDTO){
    this.httpClient.post(`${environment.API_URL}/orders/createOrder`, orderDTO).subscribe((data) => {
      if(data){
        alert('Purchase finalized with success!');
      }
    })
  }

  getAllOrders() {
    return this.httpClient.get(`${environment.API_URL}/orders/all`);
  }

  getOrderById(orderId: String): Observable<Order>{
    return this.httpClient.get<Order>(`${environment.API_URL}/orders/${orderId}`);
  }

  updateOrder(orderID: String, orderToBeUpdated: OrderDTO){
    this.httpClient.put(`${environment.API_URL}/orders/updateOrder/${orderID}`, orderToBeUpdated).subscribe((order) => {
      if(order){
        alert('Order status updated with success!')
      }
    })
  }

  createNewOrderDTOFromOrder(order: Order){
    return new OrderDTO(
      order.clientBuyer.name,
      this.returnArrayOfGameNames(order.products),
      order.orderPrice,
      order.orderIsPayed,
      order.paymentMethod
    )
  }

  returnArrayOfGameNames(arrayOfGames: Game []){
   let arrayOfGamesNames: String [] = [];
   for(let game of arrayOfGames){
    arrayOfGamesNames.push(game.productName)
   }

   return arrayOfGamesNames;
  }
}

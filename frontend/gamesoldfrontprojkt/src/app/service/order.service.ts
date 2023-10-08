import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDTO } from '../components/model/OrderDTO';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from '../components/model/Order';
import { Game } from '../components/model/Game';
/**
 * This service is responsible for all order methods related.
 */
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


  /*This is a get method. It searches all the orders stored into the database and returns them as an observable. */
  getAllOrders() {
    return this.httpClient.get(`${environment.API_URL}/orders/all`);
  }

  /* This is a get method. It searches for a specific order by it's ID and returns it as an observable.*/
  getOrderById(orderId: String): Observable<Order>{
    return this.httpClient.get<Order>(`${environment.API_URL}/orders/${orderId}`);
  }

  /* This is a put method. It receives an orderID and an orderDTO as parameters and updates it on the database*/
  updateOrder(orderID: String, orderToBeUpdated: OrderDTO){
    this.httpClient.put(`${environment.API_URL}/orders/updateOrder/${orderID}`, orderToBeUpdated).subscribe((order) => {
      if(order){
        alert('Order status updated with success!')
      }else{
        alert("Something went wrong when updating order!");
      }
    })
  }

  /* This method receives an order as an object and creates an OrderDTO using its values */
  createNewOrderDTOFromOrder(order: Order){
    return new OrderDTO(
      order.clientBuyer.name,
      this.returnArrayOfGameNames(order.products),
      order.orderPrice,
      order.orderIsPayed,
      order.paymentMethod
    )
  }

  /* This method receives an array of type Game and returns a new array with all the games names */
  returnArrayOfGameNames(arrayOfGames: Game []){
   let arrayOfGamesNames: String [] = [];
   for(let game of arrayOfGames){
    arrayOfGamesNames.push(game.productName)
   }

   return arrayOfGamesNames;
  }


  /* This method receives a pdf report of orders from the backend and turns it into a pdf file and downloads it to the user. */
  getOrderReport(){
    this.httpClient.get(`${environment.API_URL}/orders/orders_report`, {responseType: 'blob'}).subscribe((data) => {
      var blob = new Blob([data], {type: 'application/pdf'});

      var downloadUrl = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadUrl;
      link.download = "orders_report.pdf";
      link.click();
    })
  }
}

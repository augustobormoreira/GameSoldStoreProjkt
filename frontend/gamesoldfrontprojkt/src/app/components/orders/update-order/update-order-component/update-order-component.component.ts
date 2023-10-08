import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/components/model/Order';
import { OrderService } from 'src/app/service/order.service';
/**
 * This is the component responsible for updating an order. Since this project is a personal project and does not in fact implement a payment method, the only 
 * update an order can receive is from an admin of the server changing its status to "payed" or "not payed".
 */
@Component({
  selector: 'app-update-order-component',
  templateUrl: './update-order-component.component.html',
  styleUrls: ['./update-order-component.component.css']
})
export class UpdateOrderComponentComponent implements OnInit {
  orderToBeUpdated!: Order;
  saleId!: string;
  orderForm: FormGroup = new FormGroup(
    {
      orderStatus: new FormControl()
    }
  );

  /* Upon construction, injects an activatedRoute and an orderService via dependency injection */
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) { }


  /* On initialization retrieves the route ID parameter even if it doesn't exist and stores it into the saleId variable */
  ngOnInit(): void {
    let parameterIdIfExists = this.activatedRoute.snapshot.paramMap.get('id');
    if(parameterIdIfExists != null){
      this.saleId = parameterIdIfExists;
    }
  }


  /* Retrieves an order using the method getPromiseOfOrderToBeUpdated(), afterwards we handle the promise and in case it was fulfilled we grab the "order" value returned to us,
  store it into a local Order called orderToBeUpdated, change its status for the value in orderForm and call for the method updateOrder from orderService */
  updateOrder(){
    const promisedOrderToBeUpdated = this.getPromiseOfOrderToBeUpdated();
    promisedOrderToBeUpdated.then((order) => {
      this.orderToBeUpdated = order;
      this.orderToBeUpdated.orderIsPayed = this.orderForm.get('orderStatus')?.value;
      this.orderService.updateOrder(this.orderToBeUpdated.orderId, this.orderService.createNewOrderDTOFromOrder(this.orderToBeUpdated));
    }).catch((errorMessage) => {
      alert(errorMessage);
    })
  }


  /* This method returns a new Promise of type Order, if resolved we return the order that we are searching in the database using the method getOrderById from orderService, if
  rejected we return a simple string informing the user of the error */
  getPromiseOfOrderToBeUpdated(): Promise<Order> {
    return new Promise((resolve, reject) => {
      this.orderService.getOrderById(this.saleId).subscribe((order) => {
        if(order){
          resolve(order);
        }else{
          reject("Failure in finding Order");
        }
      })
    })
  }

  


 
   

}
  



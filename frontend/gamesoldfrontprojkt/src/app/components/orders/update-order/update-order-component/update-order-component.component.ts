import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Game } from 'src/app/components/model/Game';
import { Order } from 'src/app/components/model/Order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-update-order-component',
  templateUrl: './update-order-component.component.html',
  styleUrls: ['./update-order-component.component.css']
})
export class UpdateOrderComponentComponent implements OnInit {
  orderToBeUpdated!: Order;
  saleId!: string;
  arrayOfProducts: Game [] = [];
  categories: string[] = ['Ação', 'Story-Driven', 'RPG', 'Hack n Slash'];
  orderForm: FormGroup = new FormGroup(
    {
      orderStatus: new FormControl()
    }
  );

  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    let parameterIdIfExists = this.activatedRoute.snapshot.paramMap.get('id');
    if(parameterIdIfExists != null){
      this.saleId = parameterIdIfExists;
    }
  }


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
  



import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
/**
 * This is the order panel component and provides all functionalities necessary to orders.
 */
@Component({
  selector: 'app-order-panel',
  templateUrl: './order-panel.component.html',
  styleUrls: ['./order-panel.component.css']
})
export class OrderPanelComponent implements OnInit {

    /* Upon construction receives an orderService via dependency injection */
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

/* This method is responsible for returning the pdf file for the admin by calling the method getOrderReport() from the orderService service */
  downloadOrderReport(){
    this.orderService.getOrderReport();
  }

}

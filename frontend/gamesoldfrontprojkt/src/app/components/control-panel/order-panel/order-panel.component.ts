import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-panel',
  templateUrl: './order-panel.component.html',
  styleUrls: ['./order-panel.component.css']
})
export class OrderPanelComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }


  downloadOrderReport(){
    this.orderService.getOrderReport();
  }

}

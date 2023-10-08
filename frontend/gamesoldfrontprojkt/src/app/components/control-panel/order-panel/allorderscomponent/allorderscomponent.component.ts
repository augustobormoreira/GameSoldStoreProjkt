import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/components/model/Order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-allorderscomponent',
  templateUrl: './allorderscomponent.component.html',
  styleUrls: ['./allorderscomponent.component.css']
})
export class AllorderscomponentComponent implements OnInit {

  faTrash = faTrash;
  faFile = faFile;
  public orderList: any = [];
  displayedColumns: string[] = ['ID', 'buyer', 'gamesBought', 'update']; 
  constructor(private orderService: OrderService, private route: Router) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((data) => {
      console.log(data);
      this.orderList = data;
    })
  }


  navigateToRouteBySpecificUrlForUpdating(id: String){
    const url = `update-order/${id}`;

    this.route.navigateByUrl(`/control-panel/order-panel/${url}`);
  }


  navigateToRouteBySpecificUrlForDeleting(id: String){
    if(this.route.url === '/control-panel/game-panel'){
      const url = `remove-game/${id}`;
      this.route.navigateByUrl(`${this.route.url}/${url}`);
    }else if(this.route.url === '/control-panel/game-panel/all-games'){
      const url = `remove-game/${id}`;     
      this.route.navigateByUrl(`/control-panel/game-panel/${url}`);
    }
  }

  returnArrayWithAllGamesName(order: Order): String []{
    let arrayOfNames: String [] = [];
    for(let product of order.products){
        arrayOfNames.push(product.productName);
    }

    return arrayOfNames;
}

}

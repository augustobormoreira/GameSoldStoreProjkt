import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/components/model/Order';
import { OrderService } from 'src/app/service/order.service';
/**
 * This component displays a table with all games and shortcuts to the functionality update.
 * Should the user call for one of the functionalities the desired component will be activated with route parameters.
 */
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
  /* Upon construction receives an orderService and a router via dependency injection */
  constructor(private orderService: OrderService, private route: Router) { }

  /* On component intialization retrieves all games from the server and stores in the local array of orders orderList */
  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((data) => {  
      this.orderList = data;
    })
  }

/* This method is responsible for routing the admin to the update component, should the user activate the route via shortcut in the allorderscomponent,
the local router is called using the method navibateByUrl and using the route parameter ID */
  navigateToRouteBySpecificUrlForUpdating(id: String){
    const url = `update-order/${id}`;

    this.route.navigateByUrl(`/control-panel/order-panel/${url}`);
  }

  /* This method returns an array of product NAMES. It receives an order and iterates the order array of products adding the product names to the new array of type string */
  returnArrayWithAllGamesName(order: Order): String []{
    let arrayOfNames: String [] = [];
    for(let product of order.products){
        arrayOfNames.push(product.productName);
    }

    return arrayOfNames;
}

}

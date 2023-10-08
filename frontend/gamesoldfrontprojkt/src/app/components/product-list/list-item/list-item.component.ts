import { Component, Input, OnInit } from '@angular/core';
import { CartserviceService } from 'src/app/service/cartservice.service';
import { Game } from '../../model/Game';
/*
This class is responsible to display the game information as a card for the user to view
*/
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  /* It receives a game from the parent component ProductListComponent */
  @Input()
  game!: Game;

  /* Upon construction of the component, injects a cartService via dependency injection */
  constructor(private cartService: CartserviceService) { }

  ngOnInit(): void {
  }

  /* This method is called when the user clicks on the button to add the game to the cart, it calls for the method addToCart from the service cartService and sends the game
  it received via parameter to the service. */
  addItemToCart(gameToBeAdded: any){
    this.cartService.addToCart(gameToBeAdded);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { CartserviceService } from 'src/app/service/cartservice.service';
import { Game } from '../../model/game/Game';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input()
  game!: Game;

  constructor(private cartService: CartserviceService) { }

  ngOnInit(): void {
  }

  addItemToCart(gameToBeAdded: any){
    this.cartService.addToCart(gameToBeAdded);
  }

}

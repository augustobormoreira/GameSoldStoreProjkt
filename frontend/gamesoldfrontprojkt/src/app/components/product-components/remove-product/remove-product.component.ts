import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/service/game.service';
/**
 * This component is responsible for the removal of a product from the database.
 */
@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css']
})
export class RemoveProductComponent implements OnInit {
  productId!: String | null;

  /* Upon construction injects an httpClient, gameService and activatedRoute via dependency injection */
  constructor(private httpClient: HttpClient, private gameService: GameService, private activatedRoute: ActivatedRoute) { }
  
  /* On product initialization, retrieves the route parameter ID even if it doesn't exist and store it into the product ID variable */
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  /* On form submit, calls for the method removeGame from the gameService service */
  onSubmit(id: any) {
      this.gameService.removeGame(id.target.productId.value);
  }
}

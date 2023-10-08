import { Component, OnInit, ViewChild } from '@angular/core';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { GameService } from 'src/app/service/game.service';
import { Game } from '../../model/Game';
/**
 * This component is responsible for adding a new product to the database.
 */
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup(
    {productName: new FormControl(),
    productDescription: new FormControl(),
    productPrice: new FormControl(),
    productCategories: new FormControl(),
    productUrl: new FormControl(),
    productIconUrl: new FormControl(),
    }
  );

  /* This is an array of game categories */
  categories: string[] = ['Ação', 'Story-Driven', 'RPG', 'Hack n Slash'];

  faSquarePlus = faSquarePlus;

  /* Upon construction, injects a gameService via dependency injection */
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  /* This method is called when the form is submitted, it creates a new product using the local method createNewProduct() and the addNewGame() method from the gameService
  service. */
  addNewProduct(){
    const newProduct: Game = this.createNewProduct();
    this.gameService.addNewGame(newProduct);
  } 


  /* This is the method responsible for creating a new game, it creates a new game using the current productForm values */
  createNewProduct(): Game{
      return new Game(
        this.productForm.get('productName')?.value,
        this.productForm.get('productPrice')?.value,
        this.productForm.get('productCategories')?.value,
        this.productForm.get('productDescription')?.value,
        this.productForm.get('productUrl')?.value,
        this.productForm.get('productIconUrl')?.value
      );
  }
}

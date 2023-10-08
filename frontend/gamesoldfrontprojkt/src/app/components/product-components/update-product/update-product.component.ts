import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Game } from '../../model/Game';
import { GameService } from 'src/app/service/game.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
/**
 * This component is responsible for updating a game.
 */
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productId!: string;
  categories: string[] = ['Ação', 'Story-Driven', 'RPG', 'Hack n Slash'];
  productForm: FormGroup = new FormGroup(
    {productId: new FormControl(),
    productName: new FormControl(),
    productDescription: new FormControl(),
    productPrice: new FormControl(),
    productCategories: new FormControl(),
    productUrl: new FormControl(),
    productIconUrl: new FormControl(),
  }
  );
  
  /* Upon construction inject a gameService and an activatedRoute via dependency injection */
  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute) { }


  /* On component initialization, get the parameter ID from the route even if it doesn't exist, if the parameter ID exists then store it in the variable productID
  and call for the method searchIfProductExistsOnDatabase(), if the parameter doesn't exist, the form for product values starts as disabled until the user types
  a product ID on the productID input */
  ngOnInit(): void {
    let parameterIdIfExists = this.activatedRoute.snapshot.paramMap.get('id');
    if(parameterIdIfExists != null){
      this.productId = parameterIdIfExists.toString();
      this.searchIfProductExistsOnDatabase(this.productId);
    }else{
      this.productForm.disable();
    }
  }

  /* This method is called when the form is submitted, it creates a new Game with the current values of the productForm and calls for the method updateGame() from
  the gameService service. */
  addNewProduct(){
    const newProduct: Game = this.createNewProduct();
    this.gameService.updateGame(newProduct);
  }

  /* This is the method responsible for the creation of a new game based on the current values of the productForm */
  createNewProduct(): Game{
    const newGame : Game = new Game(
      this.productForm.get('productName')?.value,
      this.productForm.get('productPrice')?.value,
      this.productForm.get('productCategories')?.value,
      this.productForm.get('productDescription')?.value,
      this.productForm.get('productUrl')?.value,
      this.productForm.get('productIconUrl')?.value
    );
    newGame.productId = Number.parseInt(this.productId);

    return newGame;
  }

  /* If the product ID is not an empty string, calls for the method getGameById() from the gameService service, and insert the values of the product
  on the productForm form and enable the form, else simply alert the user to the fact that the ID doesn't exist on the database and keep the form disabled */
  searchIfProductExistsOnDatabase(productId: any){
    if(productId != ""){
      this.gameService.getGameById(productId).subscribe((data) => {
        if(data != null){
          this.productForm.get('productName')?.setValue(data.productName);
          this.productForm.get('productPrice')?.setValue(data.productPrice);
          this.productForm.get('productCategories')?.setValue(data.productTags);
          this.productForm.get('productDescription')?.setValue(data.productDescription);
          this.productForm.get('productUrl')?.setValue(data.productImgUrl);
          this.productForm.get('productIconUrl')?.setValue(data.productIconImgUrl);

          this.productForm.enable();
        }else{
          alert("Product not in database!")
          this.productForm.disable();
        }
      })
    }  
  }




}

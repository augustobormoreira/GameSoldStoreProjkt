import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Game } from '../../model/Game';
import { GameService } from 'src/app/service/game.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

  addNewProduct(){
    const newProduct: Game = this.createNewProduct();
    this.gameService.updateGame(newProduct);
  }

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



  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let parameterIdIfExists = this.activatedRoute.snapshot.paramMap.get('id');
    if(parameterIdIfExists != null){
      this.productId = parameterIdIfExists.toString();
      this.searchIfProductExistsOnDatabase(this.productId);
    }else{
      this.productForm.disable();
    }
  }

}

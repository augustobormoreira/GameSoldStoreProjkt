import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GameService } from 'src/app/service/game.service';
import { Game } from '../../model/Game';

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

  categories: string[] = ['Ação', 'Story-Driven', 'RPG', 'Hack n Slash'];

  faSquarePlus = faSquarePlus;

  constructor(private modalService: NgbModal, private httpClient: HttpClient, private gameService: GameService) { }

  ngOnInit(): void {
  }

  addNewProduct(){
    console.log(this.productForm.get('productCategories')?.value);
    const newProduct: Game = this.createNewProduct();
    this.gameService.addNewGame(newProduct);
  } 


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

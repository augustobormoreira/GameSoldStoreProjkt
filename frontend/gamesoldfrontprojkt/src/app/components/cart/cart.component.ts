import { Component, OnInit, ViewChild } from '@angular/core';
import { CartserviceService } from 'src/app/service/cartservice.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatTable } from '@angular/material/table';
import { OrderDTO } from '../model/OrderDTO';
import { Game } from '../model/Game';
import jwtDecode from 'jwt-decode';
import { Card } from '../model/Card';
import { CardService } from 'src/app/service/card.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  faTrash = faTrash;
  purchaseEnded: boolean = false;
  cardFormMustOpen = false;
  public productList: any = [];
  public totalPrice: number = 0;
  card: Card [] = [];
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ['name', 'price', 'description', 'tags', 'remove']; 
  cardForm: FormGroup = new FormGroup(
    {
      cardSelected: new FormControl(),
      cardNumber: new FormControl(),
      cardOwner: new FormControl(),
      cardType: new FormControl()
    }
  );

  constructor(private cartService: CartserviceService, private cardService: CardService) { }

  ngOnInit(): void {
    this.cartService.getProductList()
    .subscribe(res => {
      this.productList = res;
      this.totalPrice = this.cartService.getTotalPrice();
    })
  }

  removeItem(product: any){
    this.cartService.removeCartItem(product);
    this.table.renderRows();
  }

  removeAllItems(){
    this.cartService.removeAllItems();
  }

  finalizeCartPhase(){
    this.openFormToGetCardInformation();
  }

  createNewArrayWithProductsIds(): Array<string>{
    let newArray: Array<string> = new Array();;
    for(let i = 0; i < this.productList.length; i++){
      newArray.push(this.productList[i].productId);
    }
    return newArray;
  }

  openFormToGetCardInformation(){
    this.cardFormMustOpen = true;
    this.cardService.getAllCardsByClientUserName(this.decodeJWT().sub).subscribe((data) => {
      this.card = data;
    });    
  }

  populateFormWithCardSelectedInformation(){
    let newCard! : Card | null;
    newCard = this.getCardByCardSelected();

    this.cardForm.get('cardNumber')?.setValue(newCard?.cardNumber);
    this.cardForm.get('cardOwner')?.setValue(newCard?.cardOwner.name);
    this.cardForm.get('cardType')?.setValue(newCard?.cardType);

  }

  addNewOrder(){

    const arrayWithProductsIds: Array<string> = this.createNewArrayWithProductsIds();
    const salePrice: number = this.getOrderPrice();
    const userName: string = this.decodeJWT().sub;
    const paymentCard: Card | null = this.getCardByCardSelected();
    const newOrder = new OrderDTO(userName, arrayWithProductsIds, salePrice, this.ifCreditThenFalseElseTrue(), this.cardForm.get('cardType')?.value);

    
    this.removeAllItems();
    this.cartService.addNewOrder(newOrder);
    this.purchaseEnded = true;
  }

  getOrderPrice(): number {
    let salePrice: number = 0;
    let newArray: number [] = [];
    for(let product of this.productList){
      salePrice += product.productPrice;
    }
    return salePrice;
  }


  getCardByCardSelected(): Card | null {
    for(let card of this.card){
      if(this.cardForm.get('cardSelected')?.value === card.cardNumber){
        return card;
      }
    }

    return null;
  }

  ifCreditThenFalseElseTrue(): boolean{
    if(this.cardForm.get('cardType')?.value === 'credit') return false;

    return true;
  }

  decodeJWT(): any{
    try {
      return jwtDecode(sessionStorage.getItem('sessionToken')!);
    }catch(Error){
      return null;
    }
  }

}

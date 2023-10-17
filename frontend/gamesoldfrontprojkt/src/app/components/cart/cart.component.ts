import { Component, OnInit, ViewChild } from '@angular/core';
import { CartserviceService } from 'src/app/service/cartservice.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatTable } from '@angular/material/table';
import { OrderDTO } from '../model/OrderDTO';
import { Card } from '../model/Card';
import { CardService } from 'src/app/service/card.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TokenInfo } from 'src/app/service/tokeninfo';
import { UserService } from 'src/app/service/user.service';
import { User } from '../model/User';


/**
 * Cart component is responsible for all things cart related.
 */
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

  /* Upon construction, receive a cartService, userService, cardService and tokenInfo via dependency injection */
  constructor(private cartService: CartserviceService, private cardService: CardService, private tokenInfo: TokenInfo, private userService: UserService) { }


  /* On component initialization we use the cartService to get all products that are on the productList, this means all products selected by the user on the product-list
  component, we also get the totalPrice from the order. Note that since this is done during the initialization of the component and we only fill the cart after the server
  returns our request we have no problems with null values. */
  ngOnInit(): void {
    this.cartService.getProductList()
    .subscribe(res => {
      this.productList = res;
      this.totalPrice = this.cartService.getTotalPrice();
    })
  }

  /* This method deals with the removal of an item during the cart purchase confirmation should the user decide to. It removes the specified product and calls the table method
  renderRows() to update the table. */
  removeItem(product: any){
    this.cartService.removeCartItem(product);
    this.table.renderRows();
  }

  /* Simple method to completely empty the cart in the case the user wants. */
  removeAllItems(){
    this.cartService.removeAllItems();
  }

  /* After purchase confirmation this method is called to open the card form and give the user options to choose from his payment methods */
  finalizeCartPhase(){
    let clientId = this.tokenInfo.decodeJWT().userIdAndRole[0];
    this.userService.getClientById(clientId).subscribe((user) => {
      if(user.clientDebt!=0){
        let messageAlert: string = "Client cannot make any purchases due to " + user.clientDebt + " debt!"; 
        alert(messageAlert);
      }else{
        this.openFormToGetCardInformation();
      }
    });
  }

  /* This method uses the current productList array of products to generate a new string array containing all products ids */
  createNewArrayWithProductsIds(): Array<string>{
    let newArray: Array<string> = new Array();;
    for(let i = 0; i < this.productList.length; i++){
      newArray.push(this.productList[i].productId);
    }
    return newArray;
  }

  /* Opens the card form and gets all cards the user has registered. */
  openFormToGetCardInformation(){
    this.cardService.getAllCardsByClientUserName(this.tokenInfo.decodeJWT().sub).subscribe((data) => {
      if(data.length==0){
        alert("Client does not possess any payment methods, must register one first.");
      }
      else{
        this.cardFormMustOpen = true;
        this.card = data;
      }
    });    
  }

  /* This method is called upon selection of payment method, it retrieves the card selected by the user and fills the form with the values from it. */
  populateFormWithCardSelectedInformation(){
    let newCard! : Card | null;
    newCard = this.getCardByCardSelected();

    this.cardForm.get('cardNumber')?.setValue(newCard?.cardNumber);
    this.cardForm.get('cardOwner')?.setValue(newCard?.cardOwner.name);
    this.cardForm.get('cardType')?.setValue(newCard?.cardType);

  }

  /* This is the method responsible for adding an order to the database, it gets an array of productIds using the local method createNewArraWithProductsIds(),
  the total salePrice using the local method getOrderPrice, the userName from the decoded token and the card type from the getCardByCardSelected() method.
  Afterwards using all the variables we create a new orderDTO, remove all items from the cart, call the method AddNewOrder from cartService and end the purchase
  by setting the purchaseEnded boolean value to true */
  addNewOrder(){

    const arrayWithProductsIds: Array<string> = this.createNewArrayWithProductsIds();
    const salePrice: number = this.getOrderPrice();
    const userName: string = this.tokenInfo.decodeJWT().sub;
    const paymentCard: Card | null = this.getCardByCardSelected();
    const newOrder = new OrderDTO(userName, arrayWithProductsIds, salePrice, this.ifCreditThenFalseElseTrue(), this.cardForm.get('cardType')?.value);

    
    this.removeAllItems();
    this.cartService.addNewOrder(newOrder);
    this.purchaseEnded = true;
  }

  /* This method gets the overall price of the order from all the products */
  getOrderPrice(): number {
    let salePrice: number = 0;
    let newArray: number [] = [];
    for(let product of this.productList){
      salePrice += product.productPrice;
    }
    return salePrice;
  }


  /* Gets selected payment card from the array of user cards using the formcontrol cardSelected */
  getCardByCardSelected(): Card | null {
    for(let card of this.card){
      if(this.cardForm.get('cardSelected')?.value === card.cardNumber){
        return card;
      }
    }

    return null;
  }

  /* Since this project does not implement any actual payment, the basic logic used here is that if payed with a debit card then the order should register as  payed,
  if payed with a credit card the order registers as not payed and adds to the debt of the user. Therefore since the order status is a boolean, this method also returns
  a boolean. If the card is a credit card then the status is false, else its true. */
  ifCreditThenFalseElseTrue(): boolean{
    if(this.cardForm.get('cardType')?.value === 'credit') return false;

    return true;
  }

}

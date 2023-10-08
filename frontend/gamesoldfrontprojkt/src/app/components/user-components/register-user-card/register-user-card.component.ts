import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CardService } from 'src/app/service/card.service';
import { CardDTO } from '../../model/CardDTO';
/**
 *  This component is responsible for the registration of new payment cards by the user.
 */
@Component({
  selector: 'app-register-user-card',
  templateUrl: './register-user-card.component.html',
  styleUrls: ['./register-user-card.component.css']
})
export class RegisterUserCardComponent implements OnInit {
  expiryDate!: Date;
  cardForm: FormGroup = new FormGroup(
    {cardNumber: new FormControl(),
    userName: new FormControl(),
    expiryDate: new FormControl(),
    cardPassword: new FormControl(),
    cardType: new FormControl(),
    }
  );

/*Injects a cardService via dependency injection */
  constructor(private cardService: CardService) { }

  ngOnInit(): void {
  }

  /* This method creates a new CardDTO using the card form formcontrol values and calls the method addNewCard from the cardService */
  addNewCard() {
    const newCard = this.createNewCardDTO();
    this.cardService.addNewCard(newCard);

  }

  /* Returns a new CardDTO created with the card form formcontrol values */
  createNewCardDTO(): CardDTO {
    return new CardDTO(
      this.cardForm.get('cardNumber')?.value,
      this.cardForm.get('userName')?.value,
      this.cardForm.get('cardPassword')?.value,
      this.expiryDate,
      this.cardForm.get('cardType')?.value
    );
  }

}

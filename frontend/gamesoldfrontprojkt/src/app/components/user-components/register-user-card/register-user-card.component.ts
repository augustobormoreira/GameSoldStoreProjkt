import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CardService } from 'src/app/service/card.service';
import { CardDTO } from '../../model/CardDTO';

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


  constructor(private cardService: CardService) { }

  ngOnInit(): void {
  }

  addNewCard() {
    const newCard = this.createNewCardDTO();
    this.cardService.addNewCard(newCard);

  }

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

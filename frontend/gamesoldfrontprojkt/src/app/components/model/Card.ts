import { User } from "./User";

export class Card {
    cardID: String;
    cardNumber: String;
    cardOwner: User;
    cardPassword: String;
    expiryDate: Date;
    cardType: String;

    constructor(receivedCardID: String, receivedCardNumber: String, receivedCardOwner: User, receivedCardPassword: String, receivedExpiryDate: Date, receivedCardType: String){
        this.cardID = receivedCardID;
        this.cardNumber = receivedCardNumber;
        this.cardOwner = receivedCardOwner;
        this.cardPassword = receivedCardPassword;
        this.expiryDate = receivedExpiryDate;
        this.cardType = receivedCardType;
    }

}
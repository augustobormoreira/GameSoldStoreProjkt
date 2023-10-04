export class CardDTO {
    cardNumber: String;
    cardOwnerName: String;
    cardPassword: String;
    expiryDate: Date;
    cardType: String;

    constructor(receivedCardNumber: String, receivedCardOwnerName: String, receivedCardPassword: String, receivedExpiryDate: Date, receivedCardType: String){
        this.cardNumber = receivedCardNumber;
        this.cardOwnerName = receivedCardOwnerName;
        this.cardPassword = receivedCardPassword;
        this.expiryDate = receivedExpiryDate;
        this.cardType = receivedCardType;
    }

}
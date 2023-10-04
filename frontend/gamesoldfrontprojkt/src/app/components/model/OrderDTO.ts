
export class OrderDTO {
    userName: String;
    idBuyedGames: Array<String>;
    orderPrice: number;
    orderIsPayed: boolean;
    paymentMethod: String;

    constructor(userReceivedName: String, buyedGamesIdReceived: Array<String>, receivedOrderPrice: number, receivedOrderIsPayed: boolean, receivedPaymentMethod: String){
        this.userName = userReceivedName;
        this.idBuyedGames = buyedGamesIdReceived;
        this.orderPrice = receivedOrderPrice;
        this.orderIsPayed = receivedOrderIsPayed;
        this.paymentMethod = receivedPaymentMethod;
    }
}
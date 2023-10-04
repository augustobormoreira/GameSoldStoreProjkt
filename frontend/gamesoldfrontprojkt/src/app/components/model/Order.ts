import { Game } from "./Game";
import { User } from "./User";

export class Order {
    public orderId: String;
    public clientBuyer: User;
    public products: Game [];
    public orderPrice: number;
    public orderIsPayed: boolean;
    public paymentMethod: String;

    constructor(receivedOrderId: String, receivedClientBuyer: User, receivedGameProducts: Game[], receivedOrderPrice: number, receivedOrderIsPayed: boolean, receivedPaymentMethod: String){
        this.orderId = receivedOrderId;
        this.clientBuyer = receivedClientBuyer;
        this.products = receivedGameProducts;
        this.orderPrice = receivedOrderPrice;
        this.orderIsPayed = receivedOrderIsPayed;
        this.paymentMethod = receivedPaymentMethod;
    }
}
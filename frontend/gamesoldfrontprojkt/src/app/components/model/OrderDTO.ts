
export class OrderDTO {
    idUser!: string;
    idBuyedGames!: Array<string>;

    constructor(userReceivedId: string, buyedGamesIdReceived: Array<string>){
        this.idUser = userReceivedId;
        this.idBuyedGames = buyedGamesIdReceived;
    }
}
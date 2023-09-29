export class Game {
    productId!: number;
    productName!: string;
    productPrice!: number;
    productTags!: Array<String>;
    productDescription!: String;
    productImgUrl!: String;
    productIconImgUrl!: String;

    constructor(pName: string, pPrice: number, pTags: Array<String>, pDescription: string, pImgUrl: string, pIconImgUrl: string){
        this.productName = pName;
        this.productPrice = pPrice;
        this.productTags = pTags;
        this.productDescription = pDescription;
        this.productImgUrl = pImgUrl;
        this.productIconImgUrl = pIconImgUrl;
    }


}
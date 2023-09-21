export class Game {
    private _productId!: number;
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

    public get productId(): number {
        return this._productId;
    }
    public set productId(value: number) {
        this._productId = value;
    }


}
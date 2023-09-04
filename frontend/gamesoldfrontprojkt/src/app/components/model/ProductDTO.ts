export class ProductDTO {
    private productName!: String;
    private productPrice!: number;
    private productTags!:  Array<String>;
    private productDescription!: String;
    private productImgUrl!: String;
    private productIconImgUrl!: String;

    constructor(productName: String, productPrice: number, productCategories: Array<String>,
         productDescription: String, productImageUrl: String, productIconImageUrl: String){
            this.productName = productName;
            this.productPrice = productPrice;
            this.productTags = productCategories;
            this.productDescription = productDescription;
            this.productImgUrl = productImageUrl;
            this.productIconImgUrl = productIconImageUrl;
    }
}
package gamesoldstoreprojkt.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class GameProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    @Column(unique = true)
    private String productName;
    private Double productPrice;
    private String [] productTags;
    private String productDescription;
    private String productImgUrl;
    private String productIconImgUrl;



    public void setToUpdatedObject(GameProduct gameProduct) {
        this.setProductName(gameProduct.getProductName());
        this.setProductPrice(gameProduct.getProductPrice());
        this.setProductTags(gameProduct.getProductTags());
        this.setProductDescription(gameProduct.getProductDescription());
        this.setProductImgUrl(gameProduct.getProductImgUrl());
        this.setProductIconImgUrl(gameProduct.getProductIconImgUrl());
    }

    public String toString(){
        return "Id = " + this.getProductId() +
                "\nNome: " + this.getProductName() +
                "\nPreco: " + this.getProductPrice() +
                "\n Categorias: " + this.getProductTags() +
                "\n Descricao: " + this.getProductDescription() +
                "\n Url Imagem" + this.getProductImgUrl() +
                "\n Url Icone" + this.getProductIconImgUrl();
                
    }
}

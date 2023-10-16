package gamesoldstoreprojkt.builder;

import gamesoldstoreprojkt.Model.DTOModels.GameProductDTO;
import lombok.Builder;

@Builder
public class GameProductDTOBuilder {
    @Builder.Default
    private Long productId = 50L;

    @Builder.Default
    private String productName = "LOL";

    @Builder.Default
    private Double productPrice = 2.99;

    @Builder.Default
    private String [] productTags = {"Ação"};

    @Builder.Default
    private String productDescription = "Moba for fun!";

    @Builder.Default
    private String productImgUrl = "https://wallpapers.com/images/featured/league-of-legends-desktop-background-jk70emfq9rgxk1qm.jpg";

    @Builder.Default
    private String productIconImgUrl = "https://i.pinimg.com/originals/e6/3a/b7/e63ab723f3bd980125e1e5ab7d8c5081.png";

    public GameProductDTO toGameDTO() {
        return new GameProductDTO(productId, productName, productPrice, productTags, productDescription, productImgUrl, productIconImgUrl);
    } 
}

package gamesoldstoreprojkt.Model.DTOModels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameProductDTO {
    private Long productId;
    private String productName;
    private Double productPrice;
    private String [] productTags;
    private String productDescription;
    private String productImgUrl;
    private String productIconImgUrl;
}

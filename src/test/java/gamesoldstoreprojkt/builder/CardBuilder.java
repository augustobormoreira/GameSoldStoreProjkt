package gamesoldstoreprojkt.builder;

import java.util.Date;

import gamesoldstoreprojkt.Model.Card;
import gamesoldstoreprojkt.Model.User;
import lombok.Builder;

@Builder
public class CardBuilder {
    @Builder.Default
    private String id = "10";
    @Builder.Default
    private String cardNumber = "123456789";
    @Builder.Default
    private User cardOwner = getUserOwner();
    @Builder.Default
    private Date expiryDate = new Date();
    @Builder.Default
    private String cardPassword = "1234";
    @Builder.Default
    private String cardType = "credit";


    private static User getUserOwner(){
        return UserBuilder.builder().build().toUser();
    }

    public Card toCard(){
        return new Card(
            id,
            cardNumber,
            cardOwner,
            expiryDate,
            cardPassword,
            cardType
        );
    }
}

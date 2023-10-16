package gamesoldstoreprojkt.builder;

import gamesoldstoreprojkt.Model.Client;
import gamesoldstoreprojkt.Model.GameProduct;
import gamesoldstoreprojkt.Model.Order;
import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.mapper.GameProductMapper;
import lombok.Builder;

@Builder
public class OrderBuilder {
    @Builder.Default
    private Long orderId = 50L;
    @Builder.Default
    private User clientBuyer = createUserBuyer();
    @Builder.Default 
    private GameProduct[] products = createProducts();
    @Builder.Default
    private Double orderPrice = 2000D;
    @Builder.Default
    private boolean orderIsPayed = true;
    @Builder.Default 
    private String paymentMethod = "debit";

    public Order toOrder(){
        return new Order(
            orderId,
            clientBuyer,
            products,
            orderPrice,
            orderIsPayed,
            paymentMethod
        );
    }

    private static Client createUserBuyer(){
        User newUser =  UserBuilder.builder().build().toUser();
        Client newClient = new Client(false, 0D);
        newClient.setIdentificationNumber(newUser.getIdentificationNumber());
        newClient.setStreetName(newUser.getStreetName());
        newClient.setHouseNumber(newUser.getHouseNumber());
        newClient.setStreetNumber(newUser.getStreetNumber());
        newClient.setUsername(newUser.getUsername());
        newClient.setPassword(newUser.getPassword());
        newClient.setIdentificationNumber(null);
        return new Client(false, 0D);
    }

    private static GameProduct [] createProducts(){
        GameProductMapper gameProductMapper = GameProductMapper.INSTANCE;
        GameProduct [] games = new GameProduct[3];
        for(int i = 0; i < games.length; i++){
            GameProduct game = gameProductMapper.toModel(GameProductDTOBuilder.builder().build().toGameDTO());
            game.setProductName("Game " + Integer.toString(i));
            game.setProductId(20L + Integer.toUnsignedLong(i));
        }

        return games;
    }
}

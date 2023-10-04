package gamesoldstoreprojkt.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDTO {
    private String userName;
    private String [] idBuyedGames;
    private String orderPrice;
    private boolean orderIsPayed;
    private String paymentMethod;
    
    
    public boolean getOrderIsPayed(){
        return this.orderIsPayed;
    }
}

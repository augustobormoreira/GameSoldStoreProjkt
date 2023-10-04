package gamesoldstoreprojkt.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    @ManyToOne
    private User clientBuyer;
    @ManyToMany
    @JoinTable(
        name = "order_products",
        joinColumns = @JoinColumn(name = "orderId"),
        inverseJoinColumns = @JoinColumn(name = "productId")
    )  
    private GameProduct[] products;
    private Double orderPrice;
    private boolean orderIsPayed; 
    private String paymentMethod;

    public Order(User clientBuyer, GameProduct [] products, boolean orderIsPayed, double orderPrice, String paymentMethod){
        this.clientBuyer = clientBuyer;
        this.products = products;
        this.orderIsPayed = orderIsPayed;
        this.orderPrice = orderPrice;
        this.paymentMethod = paymentMethod;
    }

    public boolean getOrderIsPayed(){
        return orderIsPayed;
    }
}

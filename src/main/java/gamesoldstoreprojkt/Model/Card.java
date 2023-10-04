package gamesoldstoreprojkt.Model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String cardNumber;
    @ManyToOne
    private User cardOwner;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    @Column(name = "expiry_date")
    private Date expiryDate;
    private String cardPassword;
    private String cardType;


    public Card(String cardNumber, User cardOwner, Date expiryDate, String password, String cardType){
        this.cardNumber = cardNumber;
        this.cardOwner = cardOwner;
        this.expiryDate = expiryDate;
        this.cardPassword = password;
        this.cardType = cardType;
    }

}

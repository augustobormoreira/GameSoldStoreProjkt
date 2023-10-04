package gamesoldstoreprojkt.Model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CardDTO {
    private String cardNumber;
    private String cardOwnerName;
    private String cardPassword;
    private Date expiryDate;
    private String cardType;

}

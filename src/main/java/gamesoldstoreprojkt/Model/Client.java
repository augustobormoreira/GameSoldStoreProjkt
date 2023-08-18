package gamesoldstoreprojkt.Model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DiscriminatorValue("Client")
public class Client extends User {
    private String preferredPaymentMethod;
    private boolean clientIsBlacklisted;
    private int clientDebt;
}

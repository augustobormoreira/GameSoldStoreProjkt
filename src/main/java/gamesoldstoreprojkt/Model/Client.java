package gamesoldstoreprojkt.Model;

import java.util.ArrayList;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
@Entity
@DiscriminatorValue("Client")
public class Client extends User {
    private String preferredPaymentMethod;
    private boolean clientIsBlacklisted;
    private int clientDebt;
    @OneToMany(fetch = FetchType.LAZY)
    private Card [] cards;

    public void setToUpdatedValues(Client client){
        this.setName(client.getName());
        this.setStreetNumber(client.getStreetNumber());
        this.setHouseNumber(client.getHouseNumber());
        this.setStreetName(client.getStreetName());
        this.setUsername(client.getUsername());
        this.setPassword(client.getPassword());
        this.setCards(client.getCards());
        this.setRole(UserRoles.USER);
        this.setPreferredPaymentMethod(client.getPreferredPaymentMethod());
        this.setClientIsBlacklisted(client.isClientIsBlacklisted());
        this.setClientDebt(client.getClientDebt());      
    }
}

package gamesoldstoreprojkt.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import gamesoldstoreprojkt.Model.Card;

public interface CardRepository extends JpaRepository<Card, String>{
    
    public Optional<Card> getCardByCardNumber(String cardNumber);
}

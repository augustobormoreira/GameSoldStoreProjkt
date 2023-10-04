package gamesoldstoreprojkt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import gamesoldstoreprojkt.Model.Card;

public interface CardRepository extends JpaRepository<Card, String>{
    
    public Optional<Card> getCardByCardNumber(String cardNumber);

    @Query(value = "SELECT * FROM gamesoldprojkt.card where card_owner_identification_number = :cardOwnerID", nativeQuery = true)
    public List<Card> findCardBycard_owner_identification_number(@Param("cardOwnerID") Long cardOwnerIdentificationNumber);
}

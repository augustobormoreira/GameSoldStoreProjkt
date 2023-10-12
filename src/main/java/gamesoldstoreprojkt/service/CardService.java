package gamesoldstoreprojkt.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import gamesoldstoreprojkt.Exceptions.CardExceptions.CardAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.CardExceptions.CardDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Exceptions.UserExceptions.UserDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.Card;
import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.repository.CardRepository;

@Service
public class CardService {
    @Autowired
    public CardRepository cardRepository;

    @Autowired
    public UserService userService;

    /* Adds new card to database. If card is already in database, throw exception */
    public Card addNewCard(Card newCard) throws CardAlreadyExistsInDatabaseException{
        try{
            return this.cardRepository.save(newCard);

        }catch(DataIntegrityViolationException exception){
            throw new CardAlreadyExistsInDatabaseException("Card with ID: " + newCard.getId() + " already exists!");
        }
    }

    public Card updateCard(Card updatedCard) throws CardAlreadyExistsInDatabaseException{
        return this.addNewCard(updatedCard);
    }

    /* Deleter card by cardNumber. If card does not exist in database, throw exception */
    public Boolean deleteCard(String cardNumber) throws CardDoesNotExistInDatabaseException{
        Card cardToBeDeleted = this.getCardByCardNumber(cardNumber);
        this.cardRepository.delete(cardToBeDeleted);
        return true;
    }

    /* Search card by cardNumber, if card does not exist in database, throw exception */
    public Card getCardByCardNumber(String cardNumber) throws CardDoesNotExistInDatabaseException{
        try{
            Card foundCard = this.cardRepository.getCardByCardNumber(cardNumber).get();
            return foundCard;
        }catch(NoSuchElementException exception){
            throw new CardDoesNotExistInDatabaseException("Card with card number: " + cardNumber + " does not exist in database!");
        }
    }

    /* Get all card that belong to specified User. If user does not exist, throw exception  */
   public List<Card> getCardsByOwnerName(String userName) throws UserDoesNotExistInDatabaseException{
    User clientOwner = this.userService.findByUserusername(userName);
    List<Card> cards = this.cardRepository.findCardBycard_owner_identification_number(clientOwner.getIdentificationNumber());
    return cards;
    }
}

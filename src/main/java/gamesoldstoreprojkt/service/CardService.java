package gamesoldstoreprojkt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gamesoldstoreprojkt.Model.Card;
import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.repository.CardRepository;

@Service
public class CardService {
    @Autowired
    public CardRepository cardRepository;

    @Autowired
    public UserService userService;

    public Card addNewCard(Card newCard){
        return this.cardRepository.save(newCard);
    }

    public Card updateCard(Card updatedCard){
        return this.addNewCard(updatedCard);
    }

    public Boolean deleteCard(Card cardToBeDeleted){
        this.cardRepository.delete(cardToBeDeleted);
        return true;
    }

    public Card getCardByCardNumber(String cardNumber){
        Card foundCard = this.cardRepository.getCardByCardNumber(cardNumber).get();
        if(foundCard!=null){
            return foundCard;
        }

        return null;    
    }

   public List<Card> getCardsByOwnerName(String userName){
    User clientOwner = this.userService.findByUserusername(userName).get();
    List<Card> cards = this.cardRepository.findCardBycard_owner_identification_number(clientOwner.getIdentificationNumber());
    return cards;
    }
}

package gamesoldstoreprojkt.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gamesoldstoreprojkt.Model.Card;
import gamesoldstoreprojkt.Model.Client;
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

   public Card [] getCardsByOwnerName(String userName){
        Client cardOwner = this.userService.findByClientusername(userName).get();
        if(cardOwner!=null){
            return cardOwner.getCards();
        }
        
        return null;
    }
}

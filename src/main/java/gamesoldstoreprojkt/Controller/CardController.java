package gamesoldstoreprojkt.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gamesoldstoreprojkt.Model.Card;
import gamesoldstoreprojkt.Model.CardDTO;
import gamesoldstoreprojkt.Model.Client;
import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.service.CardService;
import gamesoldstoreprojkt.service.UserService;

@RestController
@RequestMapping("/cards")
public class CardController {
    @Autowired  
    public CardService cardService;
    @Autowired
    public UserService userService;


    @PostMapping("/new-card")
    public ResponseEntity<Card> addNewCard(@RequestBody CardDTO cardDTO){
        User clientOwner = this.userService.findByClientusername(cardDTO.getCardOwnerName()).get();
        String cardPassword = new BCryptPasswordEncoder().encode(cardDTO.getCardPassword());
        Card newCard = new Card(cardDTO.getCardNumber(), clientOwner, cardDTO.getExpiryDate(), cardPassword, cardDTO.getCardType());
        newCard = this.cardService.addNewCard(newCard);

        this.userService.addUser(clientOwner);
        System.out.println(newCard.toString());

        return new ResponseEntity<>(newCard, HttpStatus.OK);
    }

    @GetMapping("/user-cards")
    public ResponseEntity<Card []> getCardsByOwnerName(String ownerName){
        Card [] listOfCards =  null/*this.cardService.getCardsByOwnerName(ownerName)*/;

        return new ResponseEntity<Card []>(listOfCards, HttpStatus.OK);
    }

    @DeleteMapping("/delete-card")
    public ResponseEntity<Boolean> deleteCardByCardNumber(String cardNumber){
        boolean cardHasBeenDeleted = false;
        Card cardFound = this.cardService.getCardByCardNumber(cardNumber);
        if(cardFound!=null){
            cardHasBeenDeleted = this.cardService.deleteCard(cardFound);
        }

        return new ResponseEntity<>(cardHasBeenDeleted, HttpStatus.OK);
    }

    @GetMapping("/{username}/all-cards")
    public ResponseEntity<List<Card>> getCardsByUsername(@PathVariable("username") String username){
        List<Card> cards = this.cardService.getCardsByOwnerName(username);
        return new ResponseEntity<List<Card>>(cards, HttpStatus.OK);
    }


    
}

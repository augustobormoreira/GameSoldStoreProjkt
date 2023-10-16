package gamesoldstoreprojkt.Controller;

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

import gamesoldstoreprojkt.Exceptions.CardExceptions.CardAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.CardExceptions.CardDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Exceptions.UserExceptions.UserDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.Card;
import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.Model.DTOModels.CardDTO;
import gamesoldstoreprojkt.service.CardService;
import gamesoldstoreprojkt.service.UserService;
/* Rest controller responsible for operations for all crud operations on Cards. */
@RestController
@RequestMapping("/cards")
public class CardController {
    /* cardService and userService autowired as it will be needed in methods */
    @Autowired  
    public CardService cardService;
    @Autowired
    public UserService userService;


    /* Create new card and add into the database. If card already exists in database, throw exception */
    @PostMapping("/new-card")
    public ResponseEntity<Card> addNewCard(@RequestBody CardDTO cardDTO) throws UserDoesNotExistInDatabaseException, CardAlreadyExistsInDatabaseException{
        User clientOwner = this.userService.findByUserusername(cardDTO.getCardOwnerName()); /* Get client by username */
        String cardPassword = new BCryptPasswordEncoder().encode(cardDTO.getCardPassword()); /* Encrypt card password using BCrypt */
        Card newCard = new Card(cardDTO.getCardNumber(), clientOwner, cardDTO.getExpiryDate(), cardPassword, cardDTO.getCardType()); /* Create new card */
        newCard = this.cardService.addNewCard(newCard); /* Add card to database */


        return new ResponseEntity<>(newCard, HttpStatus.OK);
    }

    /* Delete a card in the database by cardNumber. If card does not exist in database, throw exception */
    @DeleteMapping("/delete-card")
    public ResponseEntity<Boolean> deleteCardByCardNumber(String cardNumber) throws CardDoesNotExistInDatabaseException{
        boolean cardHasBeenDeleted = this.cardService.deleteCard(cardNumber);  
        return new ResponseEntity<>(cardHasBeenDeleted, HttpStatus.OK);
    }

     /*  Get Array of cards belonging to specific user. If user does not exist in database, throw exception */
    @GetMapping("/{username}/all-cards")
    public ResponseEntity<List<Card>> getCardsByUsername(@PathVariable("username") String username) throws UserDoesNotExistInDatabaseException{
        List<Card> cards = this.cardService.getCardsByOwnerName(username); /* Get a list of all cards belonging to the user */
        return new ResponseEntity<List<Card>>(cards, HttpStatus.OK);
    }


    
}

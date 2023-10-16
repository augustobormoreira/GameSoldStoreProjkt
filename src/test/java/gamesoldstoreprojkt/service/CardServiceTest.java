package gamesoldstoreprojkt.service;


import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;


import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import gamesoldstoreprojkt.Exceptions.CardExceptions.CardAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.CardExceptions.CardDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.Card;
import gamesoldstoreprojkt.Model.DTOModels.CardDTO;
import gamesoldstoreprojkt.builder.CardBuilder;
import gamesoldstoreprojkt.mapper.CardMapper;
import gamesoldstoreprojkt.repository.CardRepository;

@ExtendWith(MockitoExtension.class)
public class CardServiceTest {
    
    @InjectMocks
    private CardService cardService;

    @Mock
    private CardRepository cardRepository;
    
    Card newCard;

    @BeforeEach
    public void setUp(){
        newCard = CardBuilder.builder().build().toCard();
    }

    @Test
    @DisplayName("When given a card, should successfully save the card to the database")
    public void whenCardGivenShouldSaveToDatabase(){
        //when
        when(cardRepository.save(newCard)).thenReturn(newCard);

        Card savedCard = cardService.addNewCard(newCard);

        //then
        assertEquals(savedCard.getId(), newCard.getId());
        assertEquals(savedCard.getCardOwner().getName(), newCard.getCardOwner().getName());
        verify(cardRepository, times(1)).save(newCard);

    }

    @Test
    @DisplayName("When valid CardNumber given then should successfully get card from database")
    public void whenCardNumberGivenGetCardFromDatabase(){
        //when
        when(cardRepository.getCardByCardNumber(newCard.getCardNumber())).thenReturn(Optional.of(newCard));

        Card foundCard = cardService.getCardByCardNumber(newCard.getCardNumber());

        //then
        assertEquals(newCard.getId(), foundCard.getId());
        assertEquals(newCard.getCardNumber(), foundCard.getCardNumber());
        verify(cardRepository, times(1)).getCardByCardNumber(newCard.getCardNumber());

    }

    @Test
    @DisplayName("When valid CardNumber given for deletion then card must be searched for in database, then deleted")
    public void whenCardNumberGivenThenCardMustExistThenMustBeDeleted(){
        //when
        when(cardRepository.getCardByCardNumber(newCard.getCardNumber())).thenReturn(Optional.of(newCard));

        Card cardFound = cardService.getCardByCardNumber(newCard.getCardNumber());
        boolean hasBeenDeleted = cardService.deleteCard(newCard.getCardNumber());

        //then
        assertEquals(cardFound.getCardNumber(), newCard.getCardNumber());
        assertEquals(true, hasBeenDeleted);
        verify(cardRepository, times(1)).delete(newCard);
    }

    @Test
    @DisplayName("When trying to add an already existing card in the database, throw exception")
    public void whenAlreadyExistingCardGivenThenThrowException(){
        //when
        when(cardRepository.save(newCard)).thenThrow(
            new CardAlreadyExistsInDatabaseException("Card with ID: " + newCard.getId() + " already exists!")
        );

        final CardAlreadyExistsInDatabaseException exception = assertThrows(CardAlreadyExistsInDatabaseException.class, () -> {
            cardService.addNewCard(newCard);
        });

        //then
        assertEquals("Card with ID: " + newCard.getId() + " already exists!", exception.getMessage());
        assertEquals(CardAlreadyExistsInDatabaseException.class, exception.getClass());
        verify(cardRepository, times(1)).save(newCard);
    }

    @Test
    @DisplayName("When trying to find a card in the database with a non existing card number, throw exception")
    public void whenInvalidCardNumberGivenThenThrowException(){
        //when
        when(cardRepository.getCardByCardNumber(newCard.getCardNumber())).thenThrow(
            new CardDoesNotExistInDatabaseException("Card with card number: " + newCard.getCardNumber() + " does not exist in database!")
        );

        final CardDoesNotExistInDatabaseException exception = assertThrows(CardDoesNotExistInDatabaseException.class, () -> {
            cardService.getCardByCardNumber(newCard.getCardNumber());
        });

        //then
        assertEquals("Card with card number: " + newCard.getCardNumber() + " does not exist in database!", exception.getMessage());
        assertEquals(CardDoesNotExistInDatabaseException.class, exception.getClass());
        verify(cardRepository, times(1)).getCardByCardNumber(newCard.getCardNumber());

    }
}

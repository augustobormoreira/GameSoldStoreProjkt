package gamesoldstoreprojkt.service;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import gamesoldstoreprojkt.Exceptions.GameExceptions.GameAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.GameExceptions.GameDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.GameProduct;
import gamesoldstoreprojkt.Model.DTOModels.GameProductDTO;
import gamesoldstoreprojkt.builder.GameProductDTOBuilder;
import gamesoldstoreprojkt.mapper.GameProductMapper;
import gamesoldstoreprojkt.repository.GameProductRepository;

@ExtendWith(MockitoExtension.class)
public class GameProductServiceTest {
    
    @InjectMocks
    private GameProductService productService;

    @Mock
    private GameProductRepository productRepository;

    private GameProductMapper gameProductMapper = GameProductMapper.INSTANCE;
    private GameProduct gameToBeAdded;
    private GameProductDTO gameProductDTO;

    @BeforeEach
    public void setUp(){
        gameProductDTO = GameProductDTOBuilder.builder().build().toGameDTO();
        gameToBeAdded = gameProductMapper.toModel(gameProductDTO);
    }


    @Test
    @DisplayName("When given a new game, should successfully save it into the database")
    public void whenGameInformedThenNewGameMustBeCreated() throws GameAlreadyExistsInDatabaseException{
        //when
        when( productRepository.save(gameToBeAdded)).thenReturn(gameToBeAdded);

        //then
        GameProduct newGameProduct = productService.addProduct(gameToBeAdded);

        assertThat(newGameProduct.getProductId(), is(equalTo(gameToBeAdded.getProductId())));
        assertThat(newGameProduct.getProductName(), is(equalTo(gameToBeAdded.getProductName())));
    }

    @Test
    @DisplayName("When given ID should get game successfully from database")
    public void whenGameIdInformedThenExistingGameMustBeFound() throws GameDoesNotExistInDatabaseException {
        //when
        when(productRepository.findById(gameProductDTO.getProductId())).thenReturn(Optional.of(gameToBeAdded));

        //then
        GameProduct gameFound = productService.getProductById(gameProductDTO.getProductId());
        assertThat(gameFound.getProductId(), is(equalTo(gameProductDTO.getProductId())));
        assertThat(gameFound.getProductName(), is(equalTo(gameProductDTO.getProductName())));
    }

    @Test
    @DisplayName("Should return successfully a list of every game in the database")
    public void whenGetProductsCalledThenMustReturnAListOfAllProducts(){
        //when
        when(productRepository.findAll()).thenReturn(Collections.singletonList(gameToBeAdded));
        
        //then
        List<GameProduct> allGames = productService.getAllProducts();
        
        assertThat(allGames, is(not(empty())));
        assertEquals(Collections.singletonList(gameToBeAdded), allGames);
    }

    @Test
    @DisplayName("When given ID for deletion, must verify if game exists in database, then deleted")
    public void whenIdInformedForDeletionGameMustBeLookedForInDatabaseThenDeleted() throws GameDoesNotExistInDatabaseException{
        //when
        when(productRepository.findById(gameProductDTO.getProductId())).thenReturn(Optional.of(gameToBeAdded));
        

        //then
        GameProduct gameToBeDeleted = productRepository.findById(gameProductDTO.getProductId()).get();
        GameProduct gameDeleted = productService.removeProductById(gameToBeDeleted.getProductId());
        
        //then
        assertThat(gameToBeDeleted.getProductId(), is(equalTo(gameProductDTO.getProductId())));
        verify(productRepository).delete(gameDeleted);
    }

    @Test
    @DisplayName("When trying to add an already existing game in the database, throw exception")
    public void whenGameAlreadyInDatabaseInformedThenThrowGameAlreadyExistsInDatabaseException() throws GameAlreadyExistsInDatabaseException{
        //when
        when(productService.addProduct(gameToBeAdded)).thenThrow(
            new GameAlreadyExistsInDatabaseException("Game with ID:" + gameToBeAdded.getProductId() + " already exists in database!")
        );

        final GameAlreadyExistsInDatabaseException exception = assertThrows(GameAlreadyExistsInDatabaseException.class, () -> {
            productService.addProduct(gameToBeAdded);
        });

        //then
        assertEquals("Game with ID:" + gameToBeAdded.getProductId() + " already exists in database!", exception.getMessage());
    }

    @Test
    @DisplayName("When ID is not valid, throw exception")
    public void whenGameIdInformedDoesNotExistInDatabaseThrowGameDoesNotExistInDatabaseException() throws GameDoesNotExistInDatabaseException{
        //when
        when(productRepository.findById(gameProductDTO.getProductId())).thenThrow(
            new GameDoesNotExistInDatabaseException("Game with ID: " + Long.toString(gameProductDTO.getProductId()) + " does not exist in database.")
        );

        //then
        final GameDoesNotExistInDatabaseException exception = assertThrows(GameDoesNotExistInDatabaseException.class, () -> {
            productService.getProductById(gameProductDTO.getProductId());
        });
        assertEquals("Game with ID: " + Long.toString(gameProductDTO.getProductId()) + " does not exist in database.", exception.getMessage());
    }


}

package gamesoldstoreprojkt.service;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import gamesoldstoreprojkt.Exceptions.GameExceptions.GameAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.GameExceptions.GameDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.GameProduct;
import gamesoldstoreprojkt.Model.GameProductDTO;
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
    public void whenGameInformedThenNewGameMustBeCreated() throws GameAlreadyExistsInDatabaseException{
        //when
        when( productRepository.save(gameToBeAdded)).thenReturn(gameToBeAdded);

        //then
        GameProduct newGameProduct = productService.addProduct(gameToBeAdded);

        assertThat(newGameProduct.getProductId(), is(equalTo(gameToBeAdded.getProductId())));
        assertThat(newGameProduct.getProductName(), is(equalTo(gameToBeAdded.getProductName())));
    }

    @Test
    public void whenGameIdInformedThenExistingGameMustBeFound() throws GameDoesNotExistInDatabaseException {
        //when
        when(productRepository.findById(gameProductDTO.getProductId())).thenReturn(Optional.of(gameToBeAdded));

        //then
        GameProduct gameFound = productService.getProductById(gameProductDTO.getProductId());
        assertThat(gameFound.getProductId(), is(equalTo(gameProductDTO.getProductId())));
        assertThat(gameFound.getProductName(), is(equalTo(gameProductDTO.getProductName())));
    }

    @Test
    public void whenGetProductsCalledThenMustReturnAListOfAllProducts(){
        //when
        when(productRepository.findAll()).thenReturn(Collections.singletonList(gameToBeAdded));
        
        //then
        List<GameProduct> allGames = productService.getAllProducts();
        
        assertThat(allGames, is(not(empty())));
        assertEquals(Collections.singletonList(gameToBeAdded), allGames);
    }

    @Test
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
}

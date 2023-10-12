package gamesoldstoreprojkt.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import gamesoldstoreprojkt.Exceptions.GameExceptions.GameAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.GameExceptions.GameDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.GameProduct;
import gamesoldstoreprojkt.repository.GameProductRepository;

/* Service responsible for all Products crud methods. */
@Service
public class GameProductService {
    @Autowired
    private GameProductRepository gameProductRepository;

    /* Add product to the database, receives the product to be added as a parameter. if product is already in database throw exception */
    public GameProduct addProduct(GameProduct product) throws GameAlreadyExistsInDatabaseException{
        try{
            return this.gameProductRepository.save(product);
        }catch(DataIntegrityViolationException exception){
            throw new GameAlreadyExistsInDatabaseException("Game with ID:" + Long.toString(product.getProductId()) + " already exists in database!");
        }
    }

    /* Saves updated product to the database, receives the product to be updated as a parameter */
    public GameProduct updateProduct(GameProduct product){
        return this.gameProductRepository.save(product);
    }

    /* Returns all products in the database as a List of Products */
    public List<GameProduct> getAllProducts(){
        return this.gameProductRepository.findAll();
    }

    /* Does product exist? Look for one by its id, if product does not exist in database, throw exception */
    public GameProduct getProductById(Long id) throws GameDoesNotExistInDatabaseException{
        try{
            return this.gameProductRepository.findById(id).get();
        }catch(NoSuchElementException exception){
            throw new GameDoesNotExistInDatabaseException("Game with ID: " + Long.toString(id) + " does not exist in database.");
        }
            
    }

    /* Removes a product by its id */
    public GameProduct removeProductById(Long productId) throws GameDoesNotExistInDatabaseException{            
            GameProduct product = getProductById(productId); /* Retrieves the product by its id */
            this.gameProductRepository.delete(product);
            return product;
    }

    /* Gets an array of products based on a received array of games IDS, if product does not exist in database, throw exception */
    public GameProduct [] getGamesById(String [] gamesId) throws NumberFormatException, GameDoesNotExistInDatabaseException{
        GameProduct [] foundGames = new GameProduct[gamesId.length];
        for(int i = 0;i < gamesId.length ; i++ ){
            if( this.getProductById(Long.parseLong(gamesId[i])) != null){ /* Does game exist? If so, add */ 
                foundGames[i] = this.getProductById(Long.parseLong(gamesId[i]));
            }
        }
        return foundGames;
    }
}

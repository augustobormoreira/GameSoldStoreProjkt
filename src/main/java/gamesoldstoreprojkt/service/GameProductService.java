package gamesoldstoreprojkt.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gamesoldstoreprojkt.Exceptions.GameDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.GameProduct;
import gamesoldstoreprojkt.repository.GameProductRepository;

/* Service responsible for all Products crud methods. */
@Service
public class GameProductService {
    @Autowired
    private GameProductRepository gameProductRepository;

    /* Add product to the database, receives the product to be added as a parameter */
    public GameProduct addProduct(GameProduct product){
        return this.gameProductRepository.save(product);
    }

    /* Saves updated product to the database, receives the product to be updated as a parameter */
    public GameProduct updateProduct(GameProduct product){
        return this.gameProductRepository.save(product);
    }

    /* Returns all products in the database as a List of Products */
    public List<GameProduct> getAllProducts(){
        return this.gameProductRepository.findAll();
    }

    /* Does product exist? Look for one by its id, returns an Optional of type GameProduct */
    public Optional<GameProduct> getProductById(Long id){
        return this.gameProductRepository.findById(id);
    }

    /* Removes a product by its id */
    public GameProduct removeProductById(Long productId) throws GameDoesNotExistInDatabaseException{
        try{
            
            GameProduct product = getProductById(productId).get(); /* Retrieves the product by its id */
            this.gameProductRepository.delete(product);
            return product;
            
        }catch(NoSuchElementException exception){
            throw new GameDoesNotExistInDatabaseException("Game with ID: " + Long.toString(productId) + " does not exist");
        }
      
    }

    /* Gets an array of products based on a received array of games IDS */
    public GameProduct [] getGamesById(String [] gamesId){
        GameProduct [] foundGames = new GameProduct[gamesId.length];
        for(int i = 0;i < gamesId.length ; i++ ){
            if( this.getProductById(Long.parseLong(gamesId[i])).get() != null){ /* Does game exist? If so, add */ 
                foundGames[i] = this.getProductById(Long.parseLong(gamesId[i])).get();
            }
        }
        return foundGames;
    }
}

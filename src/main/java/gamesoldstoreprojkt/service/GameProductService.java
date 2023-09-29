package gamesoldstoreprojkt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import gamesoldstoreprojkt.Model.GameProduct;
import gamesoldstoreprojkt.repository.GameProductRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class GameProductService {
    private final GameProductRepository gameProductRepository;

    public GameProduct addProduct(GameProduct product){
        return this.gameProductRepository.save(product);
    }

    public GameProduct updateProduct(GameProduct product){
        return this.gameProductRepository.save(product);
    }

    public List<GameProduct> getAllProducts(){
        return this.gameProductRepository.findAll();
    }

    public Optional<GameProduct> getProductById(Long id){
        return this.gameProductRepository.findById(id);
    }

    public GameProduct removeProductById(Long productId){
        GameProduct product = getProductById(productId).get();
        if(product != null){
            this.gameProductRepository.delete(product);
            return product;
        }
        return null;
    }

    public GameProduct [] getGamesById(String [] gamesId){
        GameProduct [] foundGames = new GameProduct[gamesId.length];
        for(int i = 0;i < gamesId.length ; i++ ){
            foundGames[i] = this.getProductById(Long.parseLong(gamesId[i])).get();
        }
        return foundGames;
    }
}

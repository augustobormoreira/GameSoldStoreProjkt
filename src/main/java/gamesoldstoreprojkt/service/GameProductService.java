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

    public List<GameProduct> getAllProducts(){
        return this.gameProductRepository.findAll();
    }

    public Optional<GameProduct> getProductById(Long id){
        return this.gameProductRepository.findById(id);
    }
}

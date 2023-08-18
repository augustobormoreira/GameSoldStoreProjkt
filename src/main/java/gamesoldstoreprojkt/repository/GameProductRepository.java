package gamesoldstoreprojkt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import gamesoldstoreprojkt.Model.GameProduct;

public interface GameProductRepository extends JpaRepository<GameProduct ,Long> {
    
}

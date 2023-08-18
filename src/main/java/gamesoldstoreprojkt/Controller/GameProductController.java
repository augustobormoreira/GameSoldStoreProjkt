package gamesoldstoreprojkt.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gamesoldstoreprojkt.Model.GameProduct;
import gamesoldstoreprojkt.service.GameProductService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/games")
public class GameProductController {
    private final GameProductService productService;

    @PostMapping
    public ResponseEntity<GameProduct> createNewProduct(@RequestBody GameProduct product){
        GameProduct newProduct = this.productService.addProduct(product);
        return new ResponseEntity<>(newProduct, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<GameProduct>> getAllProducts(){
        List<GameProduct> allProducts = this.productService.getAllProducts();
        return new ResponseEntity<>(allProducts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<GameProduct>> getProductById(@PathVariable("id") Long id){
        Optional<GameProduct> newProduct = this.productService.getProductById(id);
        return new ResponseEntity<>(newProduct, HttpStatus.OK);
    }
    
}

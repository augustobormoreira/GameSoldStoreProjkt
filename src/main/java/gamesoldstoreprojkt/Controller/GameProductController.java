package gamesoldstoreprojkt.Controller;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Optional;

import org.apache.coyote.Response;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gamesoldstoreprojkt.Model.Employee;
import gamesoldstoreprojkt.Model.GameProduct;
import gamesoldstoreprojkt.service.DatabasePDFService;
import gamesoldstoreprojkt.service.GameProductService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/games")
public class GameProductController {
    private final GameProductService productService;

    @PostMapping("/addProduct")
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
    @GetMapping("/gamesReport")
    public ResponseEntity<InputStreamResource> turnListOfGamesIntoPdfOutput(){
        List<GameProduct> allGames = this.productService.getAllProducts();
        ByteArrayInputStream bis = DatabasePDFService.gamesPDFReport(allGames);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition", "inline; filename=teste.pdf");
        return ResponseEntity.ok().headers(httpHeaders).contentType(MediaType.APPLICATION_PDF)
        .body(new InputStreamResource(bis));
    }
    

    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<GameProduct> updateProductById(@PathVariable("id") Long id, @RequestBody GameProduct gameProduct) throws Exception{
        Optional<GameProduct> newProduct = this.productService.getProductById(id);
        newProduct.get().setToUpdatedObject(gameProduct);
        this.productService.updateProduct(newProduct.get());
        return new ResponseEntity<>(newProduct.get(), HttpStatus.OK);
    }

    @DeleteMapping("/removeProduct/{id}")
    public ResponseEntity<GameProduct> deleteProductById(@PathVariable("id") Long id) throws Exception{
        GameProduct newGameProduct = this.productService.removeProductById(id);
        if(newGameProduct!=null){
            return new ResponseEntity<GameProduct>(newGameProduct, HttpStatus.OK);
        }else{
            throw new Exception();
        }
    }
    
}

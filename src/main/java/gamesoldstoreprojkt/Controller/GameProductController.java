package gamesoldstoreprojkt.Controller;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import gamesoldstoreprojkt.Exceptions.GameExceptions.GameAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.GameExceptions.GameDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.GameProduct;
import gamesoldstoreprojkt.service.DatabasePDFService;
import gamesoldstoreprojkt.service.GameProductService;

/* Rest controller responsible for all crud operations on Games */
@RestController
@RequestMapping("/games")
public class GameProductController {
    @Autowired
    private GameProductService productService;

    /* Add new product in database. If product already exists in database, throw exception*/
    @PostMapping("/addProduct")
    public ResponseEntity<GameProduct> createNewProduct(@RequestBody GameProduct product) throws GameAlreadyExistsInDatabaseException{
        GameProduct newProduct = this.productService.addProduct(product);
        return new ResponseEntity<>(newProduct, HttpStatus.OK);
    }


    /* Get list of all games in the database */
    @GetMapping("/all")
    public ResponseEntity<List<GameProduct>> getAllProducts(){
        List<GameProduct> allProducts = this.productService.getAllProducts();
        return new ResponseEntity<>(allProducts, HttpStatus.OK);
    }

    /* Get Game by Id. If product does not exist in database, throw exception */
    @GetMapping("/{id}")
    public ResponseEntity<GameProduct> getProductById(@PathVariable("id") Long id) throws GameDoesNotExistInDatabaseException{
        /* Does product exist? If not, throw exception */
            GameProduct newProduct = this.productService.getProductById(id);
            return new ResponseEntity<>(newProduct, HttpStatus.OK);
    }

    /* Return PDF of all games */
    @GetMapping("/gamesReport")
    public ResponseEntity<InputStreamResource> turnListOfGamesIntoPdfOutput(){
        List<GameProduct> allGames = this.productService.getAllProducts();
        ByteArrayInputStream bis = DatabasePDFService.gamesPDFReport(allGames);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition", "inline; filename=teste.pdf");
        return ResponseEntity.ok().headers(httpHeaders).contentType(MediaType.APPLICATION_PDF)
        .body(new InputStreamResource(bis));
    }
    
    /* Update a product in the database. If product does not exist in database, throw exception */
    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<GameProduct> updateProductById(@PathVariable("id") Long id, @RequestBody GameProduct gameProduct) throws GameDoesNotExistInDatabaseException{
        

        GameProduct newProduct = this.productService.getProductById(id);
        newProduct.setToUpdatedObject(gameProduct); /* Update newProduct with all the gameProduct values */
        this.productService.updateProduct(newProduct); /* Save on database */

        return new ResponseEntity<>(newProduct, HttpStatus.OK);
    }

    /* Delete product by id. If product does not exist in database, throw exception */
    @DeleteMapping("/removeProduct/{id}")
    public ResponseEntity<GameProduct> deleteProductById(@PathVariable("id") Long id) throws GameDoesNotExistInDatabaseException{
        GameProduct newGameProduct = this.productService.removeProductById(id);
        
        return new ResponseEntity<GameProduct>(newGameProduct, HttpStatus.OK);
    }
    
}

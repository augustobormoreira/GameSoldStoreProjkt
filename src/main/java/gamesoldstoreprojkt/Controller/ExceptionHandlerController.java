package gamesoldstoreprojkt.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import gamesoldstoreprojkt.Exceptions.CardExceptions.CardAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.CardExceptions.CardDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Exceptions.GameExceptions.GameAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.GameExceptions.GameDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Exceptions.OrderExceptions.OrderAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.OrderExceptions.OrderDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Exceptions.UserExceptions.UserAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.UserExceptions.UserDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.DTOModels.ExceptionDTO;

@RestControllerAdvice
public class ExceptionHandlerController {
    
    /* ORDER EXCEPTIONS */
    @ExceptionHandler(OrderDoesNotExistInDatabaseException.class)
    public ResponseEntity<ExceptionDTO> orderNotFound(OrderDoesNotExistInDatabaseException exception){
        ExceptionDTO exceptionDTO = new ExceptionDTO(exception.getMessage(), "404");
        return ResponseEntity.badRequest().body(exceptionDTO);
    }
    @ExceptionHandler(OrderAlreadyExistsInDatabaseException.class)
    public ResponseEntity<ExceptionDTO> orderAlreadyExists(OrderAlreadyExistsInDatabaseException exception){
        ExceptionDTO exceptionDTO = new ExceptionDTO(exception.getMessage(), "400");
        return ResponseEntity.badRequest().body(exceptionDTO);
    }

    /* GAME EXCEPTIONS */
    @ExceptionHandler(GameAlreadyExistsInDatabaseException.class)
    public ResponseEntity<ExceptionDTO> gameAlreadyExists(GameAlreadyExistsInDatabaseException exception){
        ExceptionDTO exceptionDTO = new ExceptionDTO(exception.getMessage(), "400");
        return ResponseEntity.badRequest().body(exceptionDTO);
    }

    @ExceptionHandler(GameDoesNotExistInDatabaseException.class)
    public ResponseEntity<ExceptionDTO> gameNotFound(GameDoesNotExistInDatabaseException exception){
        ExceptionDTO exceptionDTO = new ExceptionDTO(exception.getMessage(), "404");
        return ResponseEntity.badRequest().body(exceptionDTO);
    }

    /* USER EXCEPTIONS */
    @ExceptionHandler(UserDoesNotExistInDatabaseException.class)
    public ResponseEntity<ExceptionDTO> userNotFound(UserDoesNotExistInDatabaseException exception){
        ExceptionDTO exceptionDTO = new ExceptionDTO(exception.getMessage(), "404");
        return ResponseEntity.badRequest().body(exceptionDTO);
    }

    @ExceptionHandler(UserAlreadyExistsInDatabaseException.class)
    public ResponseEntity<ExceptionDTO> userAlreadyExists(UserAlreadyExistsInDatabaseException exception){
        ExceptionDTO exceptionDTO = new  ExceptionDTO(exception.getMessage(), "400");
        return ResponseEntity.badRequest().body(exceptionDTO);
    }

    /* CARD EXCEPTIONS */
    @ExceptionHandler(CardDoesNotExistInDatabaseException.class)
    public ResponseEntity<ExceptionDTO> cardNotFound(CardDoesNotExistInDatabaseException exception){
        ExceptionDTO exceptionDTO = new ExceptionDTO(exception.getMessage(), "404");
        return ResponseEntity.badRequest().body(exceptionDTO);
    }

    @ExceptionHandler(CardAlreadyExistsInDatabaseException.class)
    public ResponseEntity<ExceptionDTO> cardAlreadyExists(CardAlreadyExistsInDatabaseException exception){
        ExceptionDTO exceptionDTO = new ExceptionDTO(exception.getMessage(), "400");
        return ResponseEntity.badRequest().body(exceptionDTO);
    }
}

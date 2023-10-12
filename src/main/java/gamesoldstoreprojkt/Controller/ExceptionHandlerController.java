package gamesoldstoreprojkt.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import gamesoldstoreprojkt.Exceptions.GameDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Exceptions.OrderDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Exceptions.UserAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.UserDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.ExceptionDTO;

@RestControllerAdvice
public class ExceptionHandlerController {
    
    @ExceptionHandler(OrderDoesNotExistInDatabaseException.class)
    public ResponseEntity orderNotFound(OrderDoesNotExistInDatabaseException exception){
        ExceptionDTO exceptionDTO = new ExceptionDTO(exception.getMessage(), "404");
        return ResponseEntity.badRequest().body(exceptionDTO);
    }

    @ExceptionHandler(GameDoesNotExistInDatabaseException.class)
    public ResponseEntity gameNotFound(GameDoesNotExistInDatabaseException exception){
        ExceptionDTO exceptionDTO = new ExceptionDTO(exception.getMessage(), "404");
        return ResponseEntity.badRequest().body(exceptionDTO);
    }

    @ExceptionHandler(UserDoesNotExistInDatabaseException.class)
    public ResponseEntity userNotFound(UserDoesNotExistInDatabaseException exception){
        ExceptionDTO exceptionDTO = new ExceptionDTO(exception.getMessage(), "404");
        return ResponseEntity.badRequest().body(exceptionDTO);
    }

    @ExceptionHandler(UserAlreadyExistsInDatabaseException.class)
    public ResponseEntity userAlreadyExists(UserAlreadyExistsInDatabaseException exception){
        ExceptionDTO exceptionDTO = new  ExceptionDTO(exception.getMessage(), "400");
        return ResponseEntity.badRequest().body(exceptionDTO);
    }
}

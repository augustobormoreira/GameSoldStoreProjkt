package gamesoldstoreprojkt.Exceptions;

public class GameDoesNotExistInDatabaseException extends Exception {
    public GameDoesNotExistInDatabaseException(String errorMessage){
        super(errorMessage);
    }
    
}

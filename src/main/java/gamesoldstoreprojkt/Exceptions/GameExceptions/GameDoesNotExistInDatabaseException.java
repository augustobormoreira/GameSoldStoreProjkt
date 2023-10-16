package gamesoldstoreprojkt.Exceptions.GameExceptions;

public class GameDoesNotExistInDatabaseException extends RuntimeException {
    public GameDoesNotExistInDatabaseException(String errorMessage){
        super(errorMessage);
    }
    
}

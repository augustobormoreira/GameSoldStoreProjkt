package gamesoldstoreprojkt.Exceptions.GameExceptions;

public class GameAlreadyExistsInDatabaseException extends RuntimeException {
    public GameAlreadyExistsInDatabaseException(String errorMessage){
        super(errorMessage);
    }
    
}

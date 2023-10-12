package gamesoldstoreprojkt.Exceptions.GameExceptions;

public class GameAlreadyExistsInDatabaseException extends Exception {
    public GameAlreadyExistsInDatabaseException(String errorMessage){
        super(errorMessage);
    }
    
}

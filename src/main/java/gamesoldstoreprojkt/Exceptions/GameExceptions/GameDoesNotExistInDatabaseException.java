package gamesoldstoreprojkt.Exceptions.GameExceptions;

public class GameDoesNotExistInDatabaseException extends Exception {
    public GameDoesNotExistInDatabaseException(String errorMessage){
        super(errorMessage);
    }
    
}

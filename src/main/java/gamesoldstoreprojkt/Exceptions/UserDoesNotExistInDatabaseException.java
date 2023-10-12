package gamesoldstoreprojkt.Exceptions;

public class UserDoesNotExistInDatabaseException extends Exception {
    public UserDoesNotExistInDatabaseException(String errorMessage){
        super(errorMessage);
    }
    
}

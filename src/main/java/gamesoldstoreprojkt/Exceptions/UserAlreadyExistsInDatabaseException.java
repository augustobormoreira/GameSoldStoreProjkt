package gamesoldstoreprojkt.Exceptions;

public class UserAlreadyExistsInDatabaseException extends Exception {
    public UserAlreadyExistsInDatabaseException(String errorMessage){
        super(errorMessage);
    }
    
}

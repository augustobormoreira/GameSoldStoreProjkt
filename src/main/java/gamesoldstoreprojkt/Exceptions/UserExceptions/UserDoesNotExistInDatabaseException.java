package gamesoldstoreprojkt.Exceptions.UserExceptions;

public class UserDoesNotExistInDatabaseException extends RuntimeException {
    public UserDoesNotExistInDatabaseException(String errorMessage){
        super(errorMessage);
    }
    
}

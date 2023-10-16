package gamesoldstoreprojkt.Exceptions.UserExceptions;

public class UserAlreadyExistsInDatabaseException extends RuntimeException {
    public UserAlreadyExistsInDatabaseException(String errorMessage){
        super(errorMessage);
    }
    
}

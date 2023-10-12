package gamesoldstoreprojkt.Exceptions.UserExceptions;

public class UserAlreadyExistsInDatabaseException extends Exception {
    public UserAlreadyExistsInDatabaseException(String errorMessage){
        super(errorMessage);
    }
    
}

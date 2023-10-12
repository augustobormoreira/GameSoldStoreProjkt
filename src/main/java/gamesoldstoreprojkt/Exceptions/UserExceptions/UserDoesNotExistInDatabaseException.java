package gamesoldstoreprojkt.Exceptions.UserExceptions;

public class UserDoesNotExistInDatabaseException extends Exception {
    public UserDoesNotExistInDatabaseException(String errorMessage){
        super(errorMessage);
    }
    
}

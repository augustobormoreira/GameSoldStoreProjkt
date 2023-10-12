package gamesoldstoreprojkt.Exceptions.OrderExceptions;

public class OrderAlreadyExistsInDatabaseException extends Exception {
    public OrderAlreadyExistsInDatabaseException(String errorMessage){
        super(errorMessage);
    }
    
}

package gamesoldstoreprojkt.Exceptions.OrderExceptions;

public class OrderAlreadyExistsInDatabaseException extends RuntimeException {
    public OrderAlreadyExistsInDatabaseException(String errorMessage){
        super(errorMessage);
    }
    
}

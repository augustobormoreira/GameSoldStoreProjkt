package gamesoldstoreprojkt.Exceptions.OrderExceptions;

public class OrderDoesNotExistInDatabaseException extends RuntimeException {
    public OrderDoesNotExistInDatabaseException(String errorMessage){
        super(errorMessage);
    }
}

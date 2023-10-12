package gamesoldstoreprojkt.Exceptions.OrderExceptions;

public class OrderDoesNotExistInDatabaseException extends Exception {
    public OrderDoesNotExistInDatabaseException(String errorMessage){
        super(errorMessage);
    }
}

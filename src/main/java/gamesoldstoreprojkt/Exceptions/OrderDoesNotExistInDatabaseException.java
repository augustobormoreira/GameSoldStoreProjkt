package gamesoldstoreprojkt.Exceptions;

public class OrderDoesNotExistInDatabaseException extends Exception {
    public OrderDoesNotExistInDatabaseException(String errorMessage){
        super(errorMessage);
    }
}

package gamesoldstoreprojkt.Exceptions.CardExceptions;

public class CardDoesNotExistInDatabaseException extends RuntimeException {
    public CardDoesNotExistInDatabaseException(String errorMessage){
        super(errorMessage);
    }
}

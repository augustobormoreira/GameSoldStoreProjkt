package gamesoldstoreprojkt.Exceptions.CardExceptions;

public class CardDoesNotExistInDatabaseException extends Exception {
    public CardDoesNotExistInDatabaseException(String errorMessage){
        super(errorMessage);
    }
}

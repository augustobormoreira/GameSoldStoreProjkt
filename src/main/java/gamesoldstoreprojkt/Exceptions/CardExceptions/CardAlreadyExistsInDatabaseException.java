package gamesoldstoreprojkt.Exceptions.CardExceptions;

public class CardAlreadyExistsInDatabaseException extends RuntimeException {
    public CardAlreadyExistsInDatabaseException(String erroMessage){
        super(erroMessage);
    }
}

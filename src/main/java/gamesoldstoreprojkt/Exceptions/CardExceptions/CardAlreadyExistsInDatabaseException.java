package gamesoldstoreprojkt.Exceptions.CardExceptions;

public class CardAlreadyExistsInDatabaseException extends Exception {
    public CardAlreadyExistsInDatabaseException(String erroMessage){
        super(erroMessage);
    }
}

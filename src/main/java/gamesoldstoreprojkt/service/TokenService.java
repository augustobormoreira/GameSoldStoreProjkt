package gamesoldstoreprojkt.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import gamesoldstoreprojkt.Model.User;

/* Service class responsible for providing methods for Token. This class uses jwt library */
@Service
public class TokenService {
    
    @Value("${api.security.token.secret}")
    private String secret;

    /* Method responsible for generating the token that will be given to the user upon authentication. */
    public String generateToken(User user){

        /* This array of Strings contains the userID and the user's Role(ADMIN OR USER)*/
        String [] userIdAndRole = {
            user.getIdentificationNumber().toString(),
            user.getRole().toString()
        };

        try{
            Algorithm algorithm = Algorithm.HMAC256(secret); /* Declares type of token creation algorithm used and send secret key as parameter.  */
            String token = JWT.create()
                    .withIssuer("gamesoldprojkt") /* Issuer is the api name */
                    .withSubject(user.getUsername()) /* Subject is user's Username */
                    .withArrayClaim("userIdAndRole", userIdAndRole) /* ArrayClaim has the userIdAndRole array of strings  */
                    .withExpiresAt(generateExpirationDate()) /* Set expiration with local method generateExpirationDate() */
                    .sign(algorithm); /* Sign with token creation algorithm and finalizes the token creation */
            return token;
        }catch(JWTCreationException exception){
            /* Catch JWTCreationException in case JWT.create() finds an issue while creating token. */
            throw new RuntimeException("Failure while generating token at TokenService.java", exception);
        }
    }

    /* Method responsible for validating the token everytime the user sends any requests. */
    public String validateToken(String token){
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret); /* Declares type of token algorithm used and send secret key as parameter. */
            return JWT.require(algorithm) /* Using method require from JWT library, requires Algorithm as parameter */
                       .withIssuer("gamesoldprojkt") /* Issuer is the api name */
                       .build()
                       .verify(token) /* Decrypt token */
                       .getSubject(); /* Grab subject, which will always be Username */
        }catch(JWTVerificationException exception){
            /* Catch JWTVerificationException in case JWT.require() finds an issue while getting subject. Returns an empty string*/
            return "";
        }
    }

    /* Privated method that returns an Instant type. Generates the token expiration date. */
    private Instant generateExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}

package gamesoldstoreprojkt.Security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import gamesoldstoreprojkt.service.TokenService;
import gamesoldstoreprojkt.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
/* Filter responsible for necessary verifications based on token information. */
@Component
/* Extends Spring's class OncePerRequestFilter, has to override the method doFilterInternal */
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    TokenService tokenService;

    @Autowired
    UserService userService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        /* Calls local method recoverToken(), sends the HttpServletRequest as parameter */
        String token = this.recoverToken(request);
        if(token != null){ /* Does token exist? */
            var username = tokenService.validateToken(token); /* Calls for method validateToken which will get the token Subject  */
            UserDetails user = userService.findByusername(username); /* Get User of type UserDetails by username */

            /* Create new UsernamePasswordAuthenticationToken with the user found and the user authorities, user credentials here is set to null */
            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

            /* Save on authentication context the token which contains the User of type UserDetails and the user Authorities */
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        /* If token == null, once the method below calls for the next filter and since we did not save any information, Spring will try to find if the user is authenticated
         * and since the user won't be, it will return a 403 forbidden error.
         */
        filterChain.doFilter(request, response);
    }

    /* Method responsible for retrieven a token from a HttpServletRequest */
    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization"); /* Get from request the Authorization header */
        if(authHeader == null) return null; /* If header == null return null, there is no token in this request */
        return authHeader.replace("Bearer ", ""); /* Return the token within the request, by default the token will come as "Bearer tokenHere" so we remove
        the string "Bearer " and send only the token as return statement     */
    }
    
}

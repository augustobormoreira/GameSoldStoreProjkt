package gamesoldstoreprojkt.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gamesoldstoreprojkt.Model.AuthenticationDTO;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.var;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthenticationController {
    
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO authData){
        var usernamePassword = new UsernamePasswordAuthenticationToken(authData.username(), authData.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        return ResponseEntity.ok().build();
    }
}

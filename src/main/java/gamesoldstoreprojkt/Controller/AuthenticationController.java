package gamesoldstoreprojkt.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.Model.DTOModels.AuthenticationDTO;
import gamesoldstoreprojkt.Model.DTOModels.LoginResponseDTO;
import gamesoldstoreprojkt.service.TokenService;
import jakarta.validation.Valid;
import lombok.var;

/* Rest controller for user authentication */
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    /* Autowired Spring Security's authenticationManager */
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;

    /* Post method responsible for User Login. Receives an AuthenticationDTO via RequestBody */
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO authData){
        /* Create new UserNamePasswordAuthenticationToken, send the username and password via parameters. */
        var usernamePassword = new UsernamePasswordAuthenticationToken(authData.username(), authData.password());
        /* call for method authenticate from authenticationManager, sends the parameter of type UserNamePasswordAuthenticationToken, returns an Authentication object along
         * with its roles
        */
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
}

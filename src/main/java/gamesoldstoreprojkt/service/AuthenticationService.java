package gamesoldstoreprojkt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import gamesoldstoreprojkt.repository.UserRepository;

@Service
/* Implements UserDetailsService so that Spring knows this is the service to be called everytime a user needs to be authenticated */
public class AuthenticationService implements UserDetailsService {
    /* Autowired userRepository */
    @Autowired
    private UserRepository userRepository;

    @Override
    /* Method to be implemented from UserDetailsService interface, receives a username calls for the method findByUsername from UserRepository. Returns a user of type
     * UserDetails
     */
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       return userRepository.findByusername(username);
    }
    
}

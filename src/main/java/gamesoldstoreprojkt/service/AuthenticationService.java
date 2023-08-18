package gamesoldstoreprojkt.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import gamesoldstoreprojkt.repository.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthenticationService implements UserDetailsService {
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       return userRepository.findByusername(username);
    }
    
}

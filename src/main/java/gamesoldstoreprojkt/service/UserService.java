package gamesoldstoreprojkt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import gamesoldstoreprojkt.Model.Client;
import gamesoldstoreprojkt.Model.Employee;
import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.repository.UserRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;  
    
    public User addUser(User user){
        return this.userRepository.save(user);
    }

    public Optional<Employee> findEmployeeById(String cpf){
        return this.userRepository.findEmployeeByCpf(cpf);
    }

    public Optional<Client> findClientById(String cpf){
        return this.userRepository.findClientByCpf(cpf);
    }

    public List<Client> findAllClients(){
        return this.userRepository.findAllClient();
    }

    public List<Employee> findAllEmployees(){
        return this.userRepository.findAllEmployee();
    }

    public Optional<User> findUserById(String id){
        return this.userRepository.findById(id);
    }

    public UserDetails findByusername(String username){
        return this.userRepository.findByusername(username);
    }
    
}

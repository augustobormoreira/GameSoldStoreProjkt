package gamesoldstoreprojkt.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import gamesoldstoreprojkt.Exceptions.UserAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.UserDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.Client;
import gamesoldstoreprojkt.Model.Employee;
import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.repository.UserRepository;
/* 
 * Service class responsible for providing all crud methods for User.
 */

@Service
public class UserService {

    /* Autowired userRepository */
    @Autowired
    private UserRepository userRepository;  
    

    /* Receive a new User or an updated User to be saved in the database */
    public User addUser(User user) throws UserAlreadyExistsInDatabaseException{
        try{
            return this.userRepository.save(user);
        }catch(DataIntegrityViolationException exception){
            throw new UserAlreadyExistsInDatabaseException("User with username: " + user.getUsername() + " is already registered!");
        }
    }

    public User saveUpdatedUser(User user){
        return this.userRepository.save(user);
    }

    /* Does employee exist? Find employee by received ID and returns Optional */
    public Optional<Employee> findEmployeeById(Long id){
        return this.userRepository.findEmployeeById(id);
    }

    /* Deprecated method, will be deleted */
    public Optional<List<Client>> findClientById(Long id){
        return this.userRepository.findClientById(id);
    }

    /* Returns a list of all users on the database which are of type Client */
    public List<Client> findAllClients(){
        return this.userRepository.findAllClient();
    }

    /* Returns a list of all users on the database which are of type Employee */
    public List<Employee> findAllEmployees(){
        return this.userRepository.findAllEmployee();
    }

    /* Returns a list of all users on the database */
    public List<User> findAllUsers(){
        return this.userRepository.findAll();
    }

    /* Does user exist? Find user by received ID and returns Optional */
    public User findUserById(String id) throws UserDoesNotExistInDatabaseException{
        try{
            return this.userRepository.findById(id).get();
        }catch(NoSuchElementException exception){
            throw new UserDoesNotExistInDatabaseException("User with ID: " + id + " does not exist in database!");
        }
    }

    /* Does user exist? Look for user on database by username and return a user of type UserDetails for authentication */
    public UserDetails findByusername(String username){
        return this.userRepository.findByusername(username);
    }

    /* Does user exist? Look for user on database by username and returns an optional of type User */
    public Optional<User> findByUserusername(String username){
        return this.userRepository.getByusername(username);
    }
    
    /* Method responsible for removing a user from the database from the received ID */
    public User removeUserById(String userId) throws UserDoesNotExistInDatabaseException{
        /* Retrieve user from database */
        User newUser = this.findUserById(userId);
        this.userRepository.delete(newUser);
        return newUser;
    }

}

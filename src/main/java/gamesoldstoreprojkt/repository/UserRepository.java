package gamesoldstoreprojkt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import gamesoldstoreprojkt.Model.Client;
import gamesoldstoreprojkt.Model.Employee;
import gamesoldstoreprojkt.Model.User;

public interface UserRepository extends JpaRepository<User, String>  {

    UserDetails findByusername(String login);

    Optional<Client> findUserByusername(String username);

    @Query("from Client")
    List<Client> findAllClient();

    @Query("from Client")
    Optional<List<Client>> findClientById(Long id);

    @Query("from Employee")
    List<Employee> findAllEmployee();

    @Query("from Employee")
    Optional<Employee> findEmployeeById(Long id);
}

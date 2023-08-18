package gamesoldstoreprojkt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import gamesoldstoreprojkt.Model.Client;
import gamesoldstoreprojkt.Model.Employee;
import gamesoldstoreprojkt.Model.User;

public interface UserRepository extends JpaRepository<User, String>  {
    @Query("from Client")
    List<Client> findAllClient();

    @Query("from Client")
    User findClientByCpf();

    @Query("from Employee")
    List<Employee> findAllEmployee();

    @Query("from Client")
    User findEmployeeByCpf();
}

package gamesoldstoreprojkt.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gamesoldstoreprojkt.Model.Client;
import gamesoldstoreprojkt.Model.Employee;
import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.service.UserService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/clients")
    public ResponseEntity<List<Client>> getAllClients(){
        List<Client> allClients = this.userService.findAllClients();
        return new ResponseEntity<>(allClients, HttpStatus.OK);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees(){
        List<Employee> allEmployees = this.userService.findAllEmployees();
        return new ResponseEntity<>(allEmployees, HttpStatus.OK);
    }

    @PostMapping("/addClient")
    public ResponseEntity<Client> addNewClient(@RequestBody Client client){
        String password = new BCryptPasswordEncoder().encode(client.getPassword());
        client.setPassword(password);
        Client newClient = (Client) this.userService.addUser(client);
        return new ResponseEntity<>(newClient, HttpStatus.OK);
    }

    @PostMapping("/addEmployee")
    public ResponseEntity<Employee> addNewEmployee(@RequestBody Employee employee){
        System.out.println("ESTE É O FUNCIONARIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO " + employee.getName());
        String password = new BCryptPasswordEncoder().encode(employee.getPassword());
        employee.setPassword(password);
        Employee newEmployee = (Employee) this.userService.addUser(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.OK);
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<Optional<User>> findUserByCpf(@PathVariable("cpf") String identificationNumber){
        Optional<User> newUser = this.userService.findUserById(identificationNumber);
        return new ResponseEntity<>(newUser, HttpStatus.OK); 
    }

    @PutMapping("/updateClient")
    public ResponseEntity<Client> updateClientByCpf(@RequestBody Client updatedClient) throws Exception{
        if(this.userService.findClientById(updatedClient.getIdentificationNumber()) != null){
            Client newClient = (Client) this.userService.addUser(updatedClient);
            return new ResponseEntity<>(newClient, HttpStatus.OK);
        } else{
            throw new Exception();
        }
    }

    @PutMapping("/updateEmployee")
    public ResponseEntity<Employee> updateEmployeeByCpf(@RequestBody Employee updatedEmployee) throws Exception{
        if(this.userService.findEmployeeById(updatedEmployee.getIdentificationNumber()) != null){
            Employee newEmployee = (Employee) this.userService.addUser(updatedEmployee);
            return new ResponseEntity<>(newEmployee, HttpStatus.OK);
        } else{
            throw new Exception();
        }
    }

}

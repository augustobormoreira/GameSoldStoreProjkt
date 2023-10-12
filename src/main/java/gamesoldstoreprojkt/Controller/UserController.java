package gamesoldstoreprojkt.Controller;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gamesoldstoreprojkt.Exceptions.UserExceptions.UserAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.UserExceptions.UserDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.Client;
import gamesoldstoreprojkt.Model.Employee;
import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.Model.UserRoles;
import gamesoldstoreprojkt.service.DatabasePDFService;
import gamesoldstoreprojkt.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    /* Get all users registered in database */
    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> allUsers = this.userService.findAllUsers();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    /* Get all clients registered in database */
    @GetMapping("/clients")
    public ResponseEntity<List<Client>> getAllClients(){
        List<Client> allClients = this.userService.findAllClients();
        return new ResponseEntity<>(allClients, HttpStatus.OK);
    }

    /* Get all employees registered in database */
    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees(){
        List<Employee> allEmployees = this.userService.findAllEmployees();
        return new ResponseEntity<>(allEmployees, HttpStatus.OK);
    }

    /* Get all users in database as PDF file */
    @GetMapping("/users_report")
    public ResponseEntity<InputStreamResource> turnListOfUsersIntoPdfOutput(){
        List<Client> allClients = this.userService.findAllClients();
        List<Employee> allEmployees = this.userService.findAllEmployees();
        ByteArrayInputStream bis = DatabasePDFService.usersPDFReport(allEmployees, allClients);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition", "inline; filename=teste.pdf");
        return ResponseEntity.ok().headers(httpHeaders).contentType(MediaType.APPLICATION_PDF)
        .body(new InputStreamResource(bis));
    }


    /* Add client to database, throws exception if client already exists */
    @PostMapping("/addClient")
    public ResponseEntity<Client> addNewClient(@RequestBody Client client) throws UserAlreadyExistsInDatabaseException{
        String password = new BCryptPasswordEncoder().encode(client.getPassword());
        client.setRole(UserRoles.USER);
        client.setPassword(password);
        System.out.println(client.toString());
        Client newClient = (Client) this.userService.addUser(client);
        return new ResponseEntity<>(newClient, HttpStatus.OK);
    }

    /* Add employee to database, throws exception if employee already exists */
    @PostMapping("/addEmployee")
    public ResponseEntity<Employee> addNewEmployee(@RequestBody Employee employee) throws UserAlreadyExistsInDatabaseException{

        String password = new BCryptPasswordEncoder().encode(employee.getPassword());
        employee.setPassword(password);
        employee.setRole(UserRoles.ADMIN);
        Employee newEmployee = (Employee) this.userService.addUser(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.OK);
    }

    /* Get user by ID, throws exception if user does not exist */
    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable("id") String identificationNumber) throws UserDoesNotExistInDatabaseException{
        User newUser = this.userService.findUserById(identificationNumber);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
        
    }

    /* Deletes user by id, throws exception if user does not exist */
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<User> deleteUserById(@PathVariable("id") String id ) throws UserDoesNotExistInDatabaseException{
        User newUser = this.userService.removeUserById(id);
        return new ResponseEntity<>(newUser, HttpStatus.OK);        
    }

    /* Updates client by ID and value retrieved from body, throws exception if client does not exist */
    @PutMapping("/updateClient/{id}")
    public ResponseEntity<Client> updateClientByCpf(@PathVariable("id") String id, @RequestBody Client updatedClient) throws UserDoesNotExistInDatabaseException, UserAlreadyExistsInDatabaseException{
        String password = new BCryptPasswordEncoder().encode(updatedClient.getPassword());
        updatedClient.setPassword(password);
        User clientToUpdate = this.userService.findUserById(id);
        ((Client) clientToUpdate).setToUpdatedValues(updatedClient);
        Client newClient = (Client) this.userService.addUser(clientToUpdate);
        return new ResponseEntity<>(newClient, HttpStatus.OK);
       
    }

    /* Updates employee by ID and value retrieved from body, throws exception if employee does not exist */
    @PutMapping("/updateEmployee/{id}")
    public ResponseEntity<Employee> updateEmployeeByCpf(@PathVariable("id") String id, @RequestBody Employee updatedEmployee) throws UserDoesNotExistInDatabaseException, UserAlreadyExistsInDatabaseException{
        String password = new BCryptPasswordEncoder().encode(updatedEmployee.getPassword());
        updatedEmployee.setPassword(password);
        User employeeToUpdate = this.userService.findUserById(id);
        ( (Employee) employeeToUpdate).setToUpdatedValues(updatedEmployee);
        Employee newEmployee = (Employee) this.userService.addUser(employeeToUpdate);
        return new ResponseEntity<>(newEmployee, HttpStatus.OK);
      
    }

}

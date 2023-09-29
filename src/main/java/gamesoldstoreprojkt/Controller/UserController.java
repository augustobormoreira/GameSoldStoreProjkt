package gamesoldstoreprojkt.Controller;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Optional;

import javax.print.attribute.standard.Media;

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

import gamesoldstoreprojkt.Model.Client;
import gamesoldstoreprojkt.Model.Employee;
import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.Model.UserRoles;
import gamesoldstoreprojkt.service.DatabasePDFService;
import gamesoldstoreprojkt.service.UserService;
import io.micrometer.core.ipc.http.HttpSender.Response;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> allUsers = this.userService.findAllUsers();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

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


    @PostMapping("/addClient")
    public ResponseEntity<Client> addNewClient(@RequestBody Client client){
        String password = new BCryptPasswordEncoder().encode(client.getPassword());
        client.setRole(UserRoles.USER);
        client.setPassword(password);
        System.out.println(client.toString());
        Client newClient = (Client) this.userService.addUser(client);
        return new ResponseEntity<>(newClient, HttpStatus.OK);
    }

    @PostMapping("/addEmployee")
    public ResponseEntity<Employee> addNewEmployee(@RequestBody Employee employee){
        String password = new BCryptPasswordEncoder().encode(employee.getPassword());
        employee.setPassword(password);
        employee.setRole(UserRoles.ADMIN);
        Employee newEmployee = (Employee) this.userService.addUser(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> findUserById(@PathVariable("id") String identificationNumber){
        Optional<User> newUser = this.userService.findUserById(identificationNumber);
        return new ResponseEntity<>(newUser, HttpStatus.OK); 
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<User> deleteUserById(@PathVariable("id") String id ) throws Exception{
        User newUser = this.userService.removeUserById(id);
        if(newUser != null){
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        }else{
            throw new Exception();
        }

    }

    @PutMapping("/updateClient/{id}")
    public ResponseEntity<Client> updateClientByCpf(@PathVariable("id") String id, @RequestBody Client updatedClient) throws Exception{
        String password = new BCryptPasswordEncoder().encode(updatedClient.getPassword());
        updatedClient.setPassword(password);
        Optional<User> clientToUpdate = this.userService.findUserById(id);
        ((Client) clientToUpdate.get()).setToUpdatedValues(updatedClient);
        Client newClient = (Client) this.userService.addUser(clientToUpdate.get());
        return new ResponseEntity<>(newClient, HttpStatus.OK);
       
    }

    @PutMapping("/updateEmployee/{id}")
    public ResponseEntity<Employee> updateEmployeeByCpf(@PathVariable("id") String id, @RequestBody Employee updatedEmployee) throws Exception{
        String password = new BCryptPasswordEncoder().encode(updatedEmployee.getPassword());
        updatedEmployee.setPassword(password);
        Optional<User> employeeToUpdate = this.userService.findUserById(id);
        ( (Employee) employeeToUpdate.get()).setToUpdatedValues(updatedEmployee);
        Employee newEmployee = (Employee) this.userService.addUser(employeeToUpdate.get());
        return new ResponseEntity<>(newEmployee, HttpStatus.OK);
    }

}

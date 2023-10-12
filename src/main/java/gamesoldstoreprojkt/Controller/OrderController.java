package gamesoldstoreprojkt.Controller;

import org.springframework.web.bind.annotation.RestController;

import gamesoldstoreprojkt.Exceptions.OrderDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Exceptions.UserAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.UserDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.Client;
import gamesoldstoreprojkt.Model.GameProduct;
import gamesoldstoreprojkt.Model.Order;
import gamesoldstoreprojkt.Model.OrderDTO;
import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.service.DatabasePDFService;
import gamesoldstoreprojkt.service.GameProductService;
import gamesoldstoreprojkt.service.OrderService;
import gamesoldstoreprojkt.service.UserService;

import org.springframework.web.bind.annotation.RequestMapping;


import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


/* Controller responsible for all crud methods for Orders */
@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private GameProductService gameProductService;

    /* Add new order to database */
    @PostMapping("/createOrder")
    public ResponseEntity<Order> addNewOrder(@RequestBody OrderDTO orderDTO) throws UserAlreadyExistsInDatabaseException {
        Optional<User> userBuyer = this.userService.findByUserusername(orderDTO.getUserName()); /* Get User by userName on orderDTO */
        GameProduct [] idGamesToBuy = this.gameProductService.getGamesById(orderDTO.getIdBuyedGames()); /* Get array of games by gamesID array on orderDTO */
        
        if(orderDTO.getPaymentMethod().equalsIgnoreCase("credit")){ /* If user payed with credit, we consider order as not payed and add the order price to his debt */
            Client updatedClient = (Client) userBuyer.get();
            updatedClient.setClientDebt(Double.parseDouble(orderDTO.getOrderPrice()));
            this.userService.addUser(updatedClient);
        }

        /* Create new order */
        Order orderToBeSaved = new Order(userBuyer.get(), idGamesToBuy, orderDTO.getOrderIsPayed() , Double.parseDouble(orderDTO.getOrderPrice()), orderDTO.getPaymentMethod());

        Order newOrder = this.orderService.createOrder(orderToBeSaved);/* Add order to database */
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    /* Get list of all orders in the database */
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders(){
        List<Order> orders = this.orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    /* Get order by id */
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable("id") Long id) throws OrderDoesNotExistInDatabaseException{
        try{
        Order newOrder = this.orderService.findOrderById(id).get();
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
        }catch(NoSuchElementException exception){
            throw new OrderDoesNotExistInDatabaseException("Order with ID: " + Long.toString(id) + " does not exist.");
        }
    }

    /* Update order in the database, by project logic we only update the status of the order, e.g if order is payed or not */
    @PutMapping("/updateOrder/{id}")
    public ResponseEntity<Order> updateOrderById(@PathVariable("id") Long orderId, @RequestBody OrderDTO orderDTO) throws OrderDoesNotExistInDatabaseException, UserAlreadyExistsInDatabaseException, UserDoesNotExistInDatabaseException {
        Order orderToBeUpdated = this.orderService.findOrderById(orderId).get();

        if(orderToBeUpdated == null) throw new OrderDoesNotExistInDatabaseException("Order with ID: " + Long.toString(orderId) + " does not exist!"); /* Does order exist? If not, throw exception */

        orderToBeUpdated.setOrderIsPayed(orderDTO.getOrderIsPayed());
        if(orderToBeUpdated.getPaymentMethod().equalsIgnoreCase("credit")){ /* Is order to be updated a credit payed order? If so, remove debt from client */         
            Client clientBuyer = (Client) this.userService.findUserById(Long.toString(orderToBeUpdated.getClientBuyer().getIdentificationNumber()));
            clientBuyer.setClientDebt(orderToBeUpdated.getOrderPrice() * -1);
            this.userService.addUser(clientBuyer);
        }

        this.orderService.createOrder(orderToBeUpdated);

        return new ResponseEntity<Order>(orderToBeUpdated, HttpStatus.OK);
    }

    /* Get pdf of all orders in the database */
    @GetMapping("/orders_report")
    public ResponseEntity<InputStreamResource> turnListOfOrdersIntoPdfOutput(){
        List<Order> allOrders = this.orderService.getAllOrders();
        ByteArrayInputStream bis = DatabasePDFService.salesPDFReport(allOrders);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition", "inline; filename=teste.pdf");
        return ResponseEntity.ok().headers(httpHeaders).contentType(MediaType.APPLICATION_PDF)
        .body(new InputStreamResource(bis));
    }

    
    
    
}

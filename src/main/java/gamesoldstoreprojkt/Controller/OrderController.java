package gamesoldstoreprojkt.Controller;

import org.springframework.web.bind.annotation.RestController;

import gamesoldstoreprojkt.Exceptions.GameExceptions.GameDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Exceptions.OrderExceptions.OrderAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.OrderExceptions.OrderDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Exceptions.UserExceptions.UserAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.UserExceptions.UserDoesNotExistInDatabaseException;
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

    /* Add new order to database, throws exception if user does not exist in database, or order already exists in database */
    @PostMapping("/createOrder")
    public ResponseEntity<Order> addNewOrder(@RequestBody OrderDTO orderDTO) throws UserAlreadyExistsInDatabaseException, UserDoesNotExistInDatabaseException, OrderAlreadyExistsInDatabaseException, NumberFormatException, GameDoesNotExistInDatabaseException {
        User userBuyer = this.userService.findByUserusername(orderDTO.getUserName()); /* Get User by userName on orderDTO */
        GameProduct [] idGamesToBuy = this.gameProductService.getGamesById(orderDTO.getIdBuyedGames()); /* Get array of games by gamesID array on orderDTO */
        
       /* If user payed with credit, we consider order as not payed and add the order price to his debt */
        Client updatedClient = (Client) userBuyer;
        this.orderService.setDebtToUserOnOrderSavedBasedOnPaymentMethod(orderDTO, updatedClient);
        this.userService.addUser(updatedClient);
        

        /* Create new order */
        Order orderToBeSaved = new Order(userBuyer, idGamesToBuy, orderDTO.getOrderIsPayed() , Double.parseDouble(orderDTO.getOrderPrice()), orderDTO.getPaymentMethod());

        Order newOrder = this.orderService.createOrder(orderToBeSaved);/* Add order to database */
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    /* Get list of all orders in the database */
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders(){
        List<Order> orders = this.orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    /* Get order by id, throws exception if order does not exist */
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable("id") Long id) throws OrderDoesNotExistInDatabaseException{
        Order newOrder = this.orderService.findOrderById(id);
        return new ResponseEntity<>(newOrder, HttpStatus.OK);        
    }

    /* Update order in the database, by project logic we only update the status of the order, e.g if order is payed or not.
     * If Order does not exist in database, throws exception.
     * If user does not exist in database, throws exception.
    */
    @PutMapping("/updateOrder/{id}")
    public ResponseEntity<Order> updateOrderById(@PathVariable("id") Long orderId, @RequestBody OrderDTO orderDTO) throws OrderDoesNotExistInDatabaseException, UserAlreadyExistsInDatabaseException, UserDoesNotExistInDatabaseException, OrderAlreadyExistsInDatabaseException {
        Order orderToBeUpdated = this.orderService.findOrderById(orderId);

        /* If the status of the order is different, we perform some actions. If not no further action is neccessary */
        if(orderToBeUpdated.getOrderIsPayed()!=orderDTO.getOrderIsPayed()){
            Client clientBuyer = (Client) this.userService.findUserById(Long.toString(orderToBeUpdated.getClientBuyer().getIdentificationNumber()));
            this.orderService.verifyOrderStatusAndSetClientDebt(orderToBeUpdated, orderDTO, clientBuyer);
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

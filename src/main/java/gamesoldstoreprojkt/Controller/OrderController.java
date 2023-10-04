package gamesoldstoreprojkt.Controller;

import org.springframework.web.bind.annotation.RestController;

import gamesoldstoreprojkt.Model.Client;
import gamesoldstoreprojkt.Model.GameProduct;
import gamesoldstoreprojkt.Model.Order;
import gamesoldstoreprojkt.Model.OrderDTO;
import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.service.GameProductService;
import gamesoldstoreprojkt.service.OrderService;
import gamesoldstoreprojkt.service.UserService;

import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@AllArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;
    private final UserService userService;
    private final GameProductService gameProductService;

    @PostMapping("/createOrder")
    public ResponseEntity<Order> addNewOrder(@RequestBody OrderDTO orderDTO) {
        Optional<User> userBuyer = this.userService.findByClientusername(orderDTO.getUserName());
        GameProduct [] idGamesToBuy = this.gameProductService.getGamesById(orderDTO.getIdBuyedGames());
        
        if(orderDTO.getPaymentMethod().equalsIgnoreCase("credit")){
            Client updatedClient = (Client) userBuyer.get();
            updatedClient.setClientDebt(Double.parseDouble(orderDTO.getOrderPrice()));
            this.userService.addUser(updatedClient);
        }
        Order orderToBeSaved = new Order(userBuyer.get(), idGamesToBuy, orderDTO.getOrderIsPayed() , Double.parseDouble(orderDTO.getOrderPrice()), orderDTO.getPaymentMethod());

        Order newOrder = this.orderService.createOrder(orderToBeSaved);
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders(){
        List<Order> orders = this.orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Order>> getOrderById(@PathVariable("id") Long id){
        Optional<Order> newOrder = this.orderService.findOrderById(id);
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PutMapping("/updateOrder/{id}")
    public ResponseEntity<Order> updateOrderById(@PathVariable("id") Long orderId, @RequestBody OrderDTO orderDTO) {
        Order orderToBeUpdated = this.orderService.findOrderById(orderId).get();
        orderToBeUpdated.setOrderIsPayed(orderDTO.getOrderIsPayed());
        if(orderToBeUpdated.getPaymentMethod().equalsIgnoreCase("credit")){
            Client clientBuyer = (Client) this.userService.findUserById(Long.toString(orderToBeUpdated.getClientBuyer().getIdentificationNumber())).get();
            clientBuyer.setClientDebt(orderToBeUpdated.getOrderPrice() * -1);
            this.userService.addUser(clientBuyer);
        }

        this.orderService.createOrder(orderToBeUpdated);

        return new ResponseEntity<Order>(orderToBeUpdated, HttpStatus.OK);
    }

    
    
    
}

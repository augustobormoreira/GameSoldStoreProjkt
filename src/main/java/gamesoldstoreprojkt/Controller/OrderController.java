package gamesoldstoreprojkt.Controller;

import org.springframework.web.bind.annotation.RestController;

import gamesoldstoreprojkt.Model.Order;
import gamesoldstoreprojkt.service.OrderService;

import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@AllArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/createOrder")
    public ResponseEntity<Order> addNewOrder(@RequestBody Order order) {
        Order newOrder = this.orderService.createOrder(order);
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

    
    
    
}

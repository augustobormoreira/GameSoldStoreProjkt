package gamesoldstoreprojkt.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gamesoldstoreprojkt.Exceptions.OrderDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.Order;
import gamesoldstoreprojkt.repository.OrderRepository;
/* This service is responsible for all Order crud methods. */
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    /* Create new order, receives an Order as parameter */
    public Order createOrder(Order order){
        return this.orderRepository.save(order);        
    }

    /* Retrieves all current Orders in the database and returns it as a List */
    public List<Order> getAllOrders(){
        return this.orderRepository.findAll();
    }

    /* Does Order exist? Look for one by its ID, if it exists returns an Optional of type Order */
    public Optional<Order> findOrderById(Long id){
        return this.orderRepository.findById(id);      
    }

    /* Returns a List of Orders based on a List of ordersID received */
    public List<Order> getOrdersById(List<String> ordersId) throws NumberFormatException, OrderDoesNotExistInDatabaseException{
        List<Order> foundOrders = new ArrayList<Order>();
        for(int i = 0;i < ordersId.size(); i++ ){
            foundOrders.add(
                this.findOrderById(Long.parseLong(ordersId.get(i))).get()
            );
        }
        return foundOrders;
    }

}

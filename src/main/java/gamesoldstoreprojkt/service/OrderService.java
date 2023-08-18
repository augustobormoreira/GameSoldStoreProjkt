package gamesoldstoreprojkt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import gamesoldstoreprojkt.Model.Order;
import gamesoldstoreprojkt.repository.OrderRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    public Order createOrder(Order order){
        return this.orderRepository.save(order);        
    }

    public List<Order> getAllOrders(){
        return this.orderRepository.findAll();
    }

    public Optional<Order> findOrderById(Long id){
        return this.orderRepository.findById(id);
    }

}

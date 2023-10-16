package gamesoldstoreprojkt.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import gamesoldstoreprojkt.Exceptions.OrderExceptions.OrderAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.OrderExceptions.OrderDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.Client;
import gamesoldstoreprojkt.Model.Order;
import gamesoldstoreprojkt.Model.DTOModels.OrderDTO;
import gamesoldstoreprojkt.repository.OrderRepository;
/* This service is responsible for all Order crud methods. */
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    /* Create new order, receives an Order as parameter. If order already exists in database throw exception*/
    public Order createOrder(Order order) throws OrderAlreadyExistsInDatabaseException{
        try{
            return this.orderRepository.save(order);        
        }catch(DataIntegrityViolationException exception){
            throw new OrderAlreadyExistsInDatabaseException("Order with ID: " + Long.toString(order.getOrderId()) + " already exists in database!");
        }
    }

    /* Retrieves all current Orders in the database and returns it as a List */
    public List<Order> getAllOrders(){
        return this.orderRepository.findAll();
    }

    /* Does Order exist? Look for one by its ID, if it exists returns an Order , if not throw exception*/
    public Order findOrderById(Long id) throws OrderDoesNotExistInDatabaseException{
        try{
            return this.orderRepository.findById(id).get();      
        }catch(NoSuchElementException exception){
            throw new OrderDoesNotExistInDatabaseException("Order with ID: " + Long.toString(id) + " does not exist in database!");
        }
    }

    /* Returns a List of Orders based on a List of ordersID received, if order does not exist, throw exception */
    public List<Order> getOrdersById(List<String> ordersId) throws NumberFormatException, OrderDoesNotExistInDatabaseException{
        List<Order> foundOrders = new ArrayList<Order>();
        for(int i = 0;i < ordersId.size(); i++ ){
            foundOrders.add(
                this.findOrderById(Long.parseLong(ordersId.get(i)))
            );
        }
        return foundOrders;
    }

    /* Upon order creation this method is called. Verify if the order type is of credit, then we consider the order as not payed and add the orderprice to the client debt */
    public void setDebtToUserOnOrderSavedBasedOnPaymentMethod(OrderDTO orderDTO, Client client){
        if(orderDTO.getPaymentMethod().equalsIgnoreCase("credit")){
            Double orderPrice = Double.parseDouble(orderDTO.getOrderPrice());
            client.setClientDebt(orderPrice);
        }
    }

    public void verifyOrderStatusAndSetClientDebt(Order order, OrderDTO orderDTO, Client client){
        /* IF the order is going from payed to not payed. Add orderPrice to clientDebt */
        if(order.getOrderIsPayed() && !orderDTO.getOrderIsPayed()){
            Double orderPrice = Double.parseDouble(orderDTO.getOrderPrice());
            client.setClientDebt(orderPrice);
            order.setOrderIsPayed(orderDTO.getOrderIsPayed());
        } else if(!order.getOrderIsPayed() && orderDTO.getOrderIsPayed()){ /* If the order is going from not payed to payed. Remove debt from client */
            Double orderPrice = Double.parseDouble(orderDTO.getOrderPrice());
            if(client.getClientDebt()>0 && client.getClientDebt()>orderPrice) client.setClientDebt(orderPrice * -1);
            order.setOrderIsPayed(orderDTO.getOrderIsPayed());
        }
    }
}

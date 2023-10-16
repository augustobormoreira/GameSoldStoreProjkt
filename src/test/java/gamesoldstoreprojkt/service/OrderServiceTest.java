package gamesoldstoreprojkt.service;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;

import gamesoldstoreprojkt.Exceptions.OrderExceptions.OrderAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.OrderExceptions.OrderDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.Order;
import gamesoldstoreprojkt.builder.OrderBuilder;
import gamesoldstoreprojkt.repository.OrderRepository;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {
    @InjectMocks
    private OrderService orderService;

    @Mock
    private OrderRepository orderRepository;

    Order newOrder;

    @BeforeEach
    public void setUp(){
        newOrder = OrderBuilder.builder().build().toOrder();
    }

    @Test
    @DisplayName("When given a new order, must successfully save it to the database")
    public void whenGivenNewOrderMustSaveItToDB(){
        //when
        when(orderRepository.save(newOrder)).thenReturn(newOrder);

        Order savedOrder = orderService.createOrder(newOrder);

        //then
        assertEquals(savedOrder.getOrderId(), newOrder.getOrderId());
        verify(orderRepository, times(1)).save(newOrder);
    }

    @Test
    @DisplayName("When given a valid ID, should successfully get an order from the database")
    public void whenGivenValidIdShouldGetOrderFromDB(){
        //when
        when(orderRepository.findById(newOrder.getOrderId())).thenReturn(Optional.of(newOrder));    
    
        Order foundOrder = orderService.findOrderById(newOrder.getOrderId());

        //then
        assertEquals(foundOrder.getOrderId(), newOrder.getOrderId());
        verify(orderRepository, times(1)).findById(newOrder.getOrderId());        
    }

    @Test
    @DisplayName("When given order that already exists in database, then throw exception")
    public void ifOrderAlreadyExistsThenThrowException(){
        //when
        when(orderRepository.save(newOrder)).thenThrow(
            new OrderAlreadyExistsInDatabaseException("Order with ID: " + Long.toString(newOrder.getOrderId()) + " already exists in database!")
        );
        
        final OrderAlreadyExistsInDatabaseException exception = assertThrows(OrderAlreadyExistsInDatabaseException.class, () -> {
            orderService.createOrder(newOrder);
        });

        //then
        assertEquals("Order with ID: " + Long.toString(newOrder.getOrderId()) + " already exists in database!", exception.getMessage());
        assertEquals(OrderAlreadyExistsInDatabaseException.class, exception.getClass());
        verify(orderRepository, times(1)).save(newOrder);
    }

    @Test
    @DisplayName("When given invalid ID, then throw exception")
    public void whenGivenInvalidIDThenMustThrowException(){
        //when
        when(orderRepository.findById(newOrder.getOrderId())).thenThrow(
            new OrderDoesNotExistInDatabaseException("Order with ID: " + Long.toString(newOrder.getOrderId()) + " does not exist in database!")
        );

        final OrderDoesNotExistInDatabaseException exception = assertThrows(OrderDoesNotExistInDatabaseException.class, () -> {
            orderService.findOrderById(newOrder.getOrderId());
        });

        //then
        assertEquals("Order with ID: " + Long.toString(newOrder.getOrderId()) + " does not exist in database!", exception.getMessage());
        assertEquals(OrderDoesNotExistInDatabaseException.class, exception.getClass());
        verify(orderRepository, times(1)).findById(newOrder.getOrderId());
    }
}

package gamesoldstoreprojkt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import gamesoldstoreprojkt.Model.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}

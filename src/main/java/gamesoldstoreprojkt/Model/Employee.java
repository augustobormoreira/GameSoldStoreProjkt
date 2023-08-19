package gamesoldstoreprojkt.Model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("Employee")
public class Employee extends User { 
    private String jobRole; 
    private String salary;
}

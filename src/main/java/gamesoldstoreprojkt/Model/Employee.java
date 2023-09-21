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

    public void setToUpdatedValues(Employee employee){
        this.setName(employee.getName());
        this.setStreetNumber(employee.getStreetNumber());
        this.setHouseNumber(employee.getHouseNumber());
        this.setStreetName(employee.getStreetName());
        this.setUsername(employee.getUsername());
        this.setPassword(employee.getPassword());
        this.setRole(UserRoles.ADMIN);
        this.setJobRole(employee.getJobRole());
        this.setSalary(employee.getSalary());
    }
}

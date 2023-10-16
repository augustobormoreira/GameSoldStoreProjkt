package gamesoldstoreprojkt.builder;

import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.Model.UserRoles;
import lombok.Builder;

@Builder
public class UserBuilder {
    @Builder.Default
    private Long identificationNumber = 50L;

    @Builder.Default
    private String name = "Junim";

    @Builder.Default
    private String streetNumber = "30";

    @Builder.Default
    private String houseNumber = "20";

    @Builder.Default
    private String streetName = "Rua do Junim";

    @Builder.Default
    private String username = "junim";

    @Builder.Default
    private String password = "junim";

    @Builder.Default
    private UserRoles role = UserRoles.USER;

    public User toUser(){
        return new User(
            identificationNumber,
            name,
            streetNumber,
            houseNumber,
            streetName,
            username,
            password,
            role
        );
    }
}

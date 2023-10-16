package gamesoldstoreprojkt.service;

import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;


import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import gamesoldstoreprojkt.Exceptions.UserExceptions.UserAlreadyExistsInDatabaseException;
import gamesoldstoreprojkt.Exceptions.UserExceptions.UserDoesNotExistInDatabaseException;
import gamesoldstoreprojkt.Model.User;
import gamesoldstoreprojkt.builder.UserBuilder;
import gamesoldstoreprojkt.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Test
    @DisplayName("When a user is given, then it should be saved in the database.")
    public void ifUserInformedThenUserShouldBeAddedInDatabase() throws UserAlreadyExistsInDatabaseException{
        User userToBeAdded = UserBuilder.builder().build().toUser();
        //when
        when(userRepository.save(userToBeAdded)).thenReturn(userToBeAdded);

        //then
        User userAdded = userService.addUser(userToBeAdded);
        assertThat(userToBeAdded.getIdentificationNumber(), is(equalTo(userAdded.getIdentificationNumber())));
        assertThat(userToBeAdded.getUsername(), is(equalTo(userToBeAdded.getUsername())));
    }

    @Test
    @DisplayName("When ID is valid should get an existing user from database.")
    public void ifUserIdValidInformedThenShouldReturnUser() throws UserDoesNotExistInDatabaseException{
        User userToBeAdded = UserBuilder.builder().build().toUser();
        String userId = Long.toString(userToBeAdded.getIdentificationNumber());
        //when
        when(userRepository.findById(userId)).thenReturn(Optional.of(userToBeAdded));

        //then
        User userFound = userService.findUserById(userId);

        assertThat(userId, is(equalTo(Long.toString(userFound.getIdentificationNumber()))));
        assertThat(userToBeAdded.getUsername(), is(equalTo(userFound.getUsername())));
    }

    @Test
    @DisplayName("When ID is not valid, then should return a user does not exist in database exception")
    public void ifIdNotValidThenThrowUserDoesNotExistInDatabaseException(){
        //when
        when(userRepository.findById("30")).thenThrow(
            new UserDoesNotExistInDatabaseException("User with ID: " + "30" + " does not exist in database!")
        );

        //then
        final UserDoesNotExistInDatabaseException exception = assertThrows(UserDoesNotExistInDatabaseException.class, () -> {
            userService.findUserById("30");
        });

        assertEquals("User with ID: " + "30" + " does not exist in database!", exception.getMessage());
        assertEquals(UserDoesNotExistInDatabaseException.class, exception.getClass());
        verify(userRepository, times(1)).findById("30");
    }

    @Test
    @DisplayName("When user already exists in database, then should return a user already exists in database exception")
    public void ifUserAlreadyExistsInDatabaseThenThrowException(){
        User newUser = UserBuilder.builder().build().toUser();
        when(userRepository.save(newUser)).thenThrow(
            new UserAlreadyExistsInDatabaseException("User with username: " + Long.toString(newUser.getIdentificationNumber()) + " is already registered!")
        );


        //then
        final UserAlreadyExistsInDatabaseException exception = assertThrows(UserAlreadyExistsInDatabaseException.class, () -> {
            userService.addUser(newUser);
        });

        assertEquals("User with username: " + Long.toString(newUser.getIdentificationNumber()) + " is already registered!", exception.getMessage());
        assertEquals(UserAlreadyExistsInDatabaseException.class, exception.getClass());
        verify(userRepository, times(1)).save(newUser);

    }

    @Test
    @DisplayName("Should get a list of all users on database successfully.")
    public void shouldReturnListOfUsersSuccessfully(){
        User newUser = UserBuilder.builder().build().toUser();
        
        //when
        when(userRepository.findAll()).thenReturn(Collections.singletonList(newUser));


        //then
        List<User> allUsersFound = userService.findAllUsers();

        assertEquals(allUsersFound, Collections.singletonList(newUser));
        verify(userRepository, times(1)).findAll();

        
    }

    @Test
    @DisplayName("When given valid username should get user successfully from database.")
    public void whenUsernameGivenShouldReturnUser(){
        User newUser = UserBuilder.builder().build().toUser();

        //
        when(userRepository.getByusername(newUser.getUsername())).thenReturn(Optional.of(newUser));

        User userFound = userService.findByUserusername(newUser.getUsername());

        //then
        assertEquals(userFound.getUsername(), newUser.getUsername());
        verify(userRepository, times(1)).getByusername(newUser.getUsername());
    }
    
    @Test
    @DisplayName("When given username is invalid should throw user does not exist in database exception")
    public void whenUserNameNotFoundThrowException(){
        User newUser = UserBuilder.builder().build().toUser();

        //when
        when(userRepository.getByusername(newUser.getUsername())).thenThrow(
            new UserDoesNotExistInDatabaseException("User with username: " + newUser.getUsername() + " does not exist in database.")
        );

        final UserDoesNotExistInDatabaseException exception = assertThrows(UserDoesNotExistInDatabaseException.class, () -> {
            userService.findByUserusername(newUser.getUsername());
        });

        //then
        assertEquals("User with username: " + newUser.getUsername() + " does not exist in database.", exception.getMessage());
        assertEquals(UserDoesNotExistInDatabaseException.class, exception.getClass());
    }

    @Test
    @DisplayName("When given ID for user deletion, must verify if user exists in database, then must be deleted")
    public void whenGivenIdForDeletionMustVerifyIfUserExistsThenMustDelete(){
        User userToBeDeleted = UserBuilder.builder().build().toUser();
        String userId = Long.toString(userToBeDeleted.getIdentificationNumber());

        //when
        when(userRepository.findById(userId)).thenReturn(Optional.of(userToBeDeleted));
        
        User deletedUser = userService.removeUserById(userId);

        assertEquals(userToBeDeleted.getIdentificationNumber(), deletedUser.getIdentificationNumber());
        verify(userRepository, times(1)).delete(userToBeDeleted);
    }
}

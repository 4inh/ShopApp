package nhlinh.shopapp.services.user;

import nhlinh.shopapp.dtos.UpdateUserDTO;
import nhlinh.shopapp.dtos.UserDTO;
import nhlinh.shopapp.exceptions.DataNotFoundException;
import nhlinh.shopapp.exceptions.InvalidPasswordException;
import nhlinh.shopapp.models.Order;
import nhlinh.shopapp.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {

    User createUser(UserDTO userDTO) throws Exception;

    String login(String phoneNumber, String password, Long roleId) throws Exception;

    User getUserDetailsFromToken(String token) throws Exception;

    User getUserDetailsFromRefreshToken(String token) throws Exception;

    User updateUser(Long userId, UpdateUserDTO updatedUserDTO) throws Exception;

    Page<User> findAll(String keyword, Pageable pageable) throws Exception;

    void resetPassword(Long userId, String newPassword)
            throws InvalidPasswordException, DataNotFoundException;

    public void blockOrEnable(Long userId, Boolean active) throws DataNotFoundException;
}

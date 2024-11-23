package nhlinh.shopapp.repositories;

import nhlinh.shopapp.models.Role;
import nhlinh.shopapp.models.Token;
import nhlinh.shopapp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TokenRepository extends JpaRepository<Token, Long> {

    List<Token> findByUser(User user);

    Token findByToken(String token);

    Token findByRefreshToken(String token);
}


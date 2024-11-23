package nhlinh.shopapp.services.token;

import nhlinh.shopapp.models.Token;
import nhlinh.shopapp.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public interface ITokenService {

    Token addToken(User user, String token, boolean isMobileDevice);

    Token refreshToken(String refreshToken, User user) throws Exception;
}

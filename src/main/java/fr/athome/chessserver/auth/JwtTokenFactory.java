package fr.athome.chessserver.auth;

import com.auth0.jwt.JWT;
import fr.athome.chessserver.user.User;
import org.springframework.stereotype.Service;

import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static fr.athome.chessserver.auth.SecurityConstants.EXPIRATION_TIME;

@Service
public class JwtTokenFactory {
    private final SecretProvider secretProvider;

    public JwtTokenFactory(SecretProvider secretProvider) {
        this.secretProvider = secretProvider;
    }

    public String getToken(CustomUserDetails userDetails) {
        return getToken(userDetails.getUsername(), userDetails.getId());
    }

    public String getToken(User user) {
        return getToken(user.getEmail(), user.getId());
    }

    private String getToken(String username, long userId) {
        return JWT.create()
                .withClaim("id", userId)
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(secretProvider.getSecret().getBytes()));
    }
}

package fr.athome.chessserver.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SecretProvider {
    @Value("${secret}")
    private String secret;

    public String getSecret() {
        return secret;
    }
}

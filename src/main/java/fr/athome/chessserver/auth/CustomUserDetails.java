package fr.athome.chessserver.auth;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails extends User {
    private final long id;
    public CustomUserDetails(String username, String password, long id) {
        super(username, password, Collections.emptyList());
        this.id = id;
    }

    public long getId() {
        return id;
    }
}

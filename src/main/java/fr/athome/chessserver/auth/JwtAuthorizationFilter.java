package fr.athome.chessserver.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;

import static fr.athome.chessserver.auth.SecurityConstants.HEADER_STRING;
import static fr.athome.chessserver.auth.SecurityConstants.TOKEN_PREFIX;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private final SecretProvider secretProvider;
    public JwtAuthorizationFilter(AuthenticationManager authManager, SecretProvider secretProvider) {
        super(authManager);
        this.secretProvider = secretProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(HEADER_STRING);

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        if (token != null) {
            // parse the token.
            DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(secretProvider.getSecret().getBytes()))
                    .build()
                    .verify(token.replace(TOKEN_PREFIX, ""));
            String email = decodedJWT.getSubject();
            long id = decodedJWT.getClaim("id").asLong();
            CustomUserDetails details = new CustomUserDetails(email, "", id);
            return new UsernamePasswordAuthenticationToken(details, null, new ArrayList<>());
        }
        return null;
    }
}

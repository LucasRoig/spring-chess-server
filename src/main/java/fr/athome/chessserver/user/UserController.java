package fr.athome.chessserver.user;

import fr.athome.chessserver.auth.AuthenticatedUserProvider;
import fr.athome.chessserver.auth.JwtTokenFactory;
import fr.athome.chessserver.auth.SecurityConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final JwtTokenFactory tokenFactory;

    @Autowired
    public UserController(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, AuthenticatedUserProvider authenticatedUserProvider, JwtTokenFactory tokenFactory) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticatedUserProvider = authenticatedUserProvider;
        this.tokenFactory = tokenFactory;
    }



    @PostMapping(value = "/api/v1/user/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        user.setUsername(request.getUsername());
        user = userRepository.save(user);
        Map<String, Object> res = new HashMap<>();
        res.put("token", SecurityConstants.TOKEN_PREFIX + tokenFactory.getToken(user));
        res.put("user", user);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @GetMapping(value = "/api/v1/user/me")
    public ResponseEntity<?> getMe() {
        Optional<User> user = userRepository.findById(authenticatedUserProvider.getAuthenticatedUserId());
        if (user.isPresent()) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}

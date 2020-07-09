package fr.athome.chessserver.user;

import fr.athome.chessserver.auth.AuthenticatedUserProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@Controller
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticatedUserProvider authenticatedUserProvider;

    @Autowired
    public UserController(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, AuthenticatedUserProvider authenticatedUserProvider) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticatedUserProvider = authenticatedUserProvider;
    }

    @PostMapping(value = "/user/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest request, HttpServletResponse response) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        user.setUsername(request.getUsername());
        user = userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping(value = "/user/me")
    public ResponseEntity<?> getMe() {
        Optional<User> user = userRepository.findById(authenticatedUserProvider.getAuthenticatedUserId());
        if (user.isPresent()) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}

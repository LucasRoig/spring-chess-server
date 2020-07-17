package fr.athome.chessserver.database;

import fr.athome.chessserver.auth.AuthenticatedUserProvider;
import fr.athome.chessserver.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class DatabaseController {
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final DatabaseRepository databaseRepository;

    public DatabaseController(AuthenticatedUserProvider authenticatedUserProvider, DatabaseRepository databaseRepository) {
        this.authenticatedUserProvider = authenticatedUserProvider;
        this.databaseRepository = databaseRepository;
    }

    @PostMapping(value = "/database")
    public ResponseEntity<?> post(@RequestBody PostDatabaseRequest request) {
        User user = authenticatedUserProvider.getAuthenticatedUser();
        Database database = new Database(request.getName(), user);
        database = databaseRepository.save(database);
        return new ResponseEntity<>(database, HttpStatus.CREATED);
    }

    @GetMapping(value = "/database/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        Optional<Database> db = databaseRepository.findById(id);
        if (db.isPresent()) {
            if (db.get().getUser().getId() == authenticatedUserProvider.getAuthenticatedUserId()) {
                return new ResponseEntity<>(db.get(),HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/database/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Database> db = databaseRepository.findById(id);
        if (db.isPresent()) {
            if (db.get().getUser().getId() == authenticatedUserProvider.getAuthenticatedUserId()) {
                databaseRepository.delete(db.get());
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/database")
    public ResponseEntity<?> getAll() {
        List<Database> all = databaseRepository.findAllByUser_Id(authenticatedUserProvider.getAuthenticatedUserId());
        return new ResponseEntity<>(all, HttpStatus.OK);
    }
}

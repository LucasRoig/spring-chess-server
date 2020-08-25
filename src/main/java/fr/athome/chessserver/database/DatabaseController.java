package fr.athome.chessserver.database;

import fr.athome.chessserver.auth.AuthenticatedUserProvider;
import fr.athome.chessserver.chess.Game;
import fr.athome.chessserver.chess.GameFactory;
import fr.athome.chessserver.chess.pgn.PgnReader;
import fr.athome.chessserver.dbchessentity.DbGame;
import fr.athome.chessserver.dbchessentity.DbGameFactory;
import fr.athome.chessserver.dbchessentity.DbGameRepository;
import fr.athome.chessserver.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class DatabaseController {
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final DatabaseRepository databaseRepository;
    private final DbGameFactory dbGameFactory;
    private final GameFactory gameFactory;
    private final DbGameRepository dbGameRepository;

    public DatabaseController(AuthenticatedUserProvider authenticatedUserProvider, DatabaseRepository databaseRepository, DbGameFactory dbGameFactory, GameFactory gameFactory, DbGameRepository dbGameRepository) {
        this.authenticatedUserProvider = authenticatedUserProvider;
        this.databaseRepository = databaseRepository;
        this.dbGameFactory = dbGameFactory;
        this.gameFactory = gameFactory;
        this.dbGameRepository = dbGameRepository;
    }

    @PostMapping(value = "/database")
    public ResponseEntity<?> post(@RequestBody PostDatabaseRequest request) {
        User user = authenticatedUserProvider.getAuthenticatedUser();
        Database database = new Database(request.getName(), user);
        database = databaseRepository.save(database);
        return new ResponseEntity<>(DatabaseDTO.fromDatabase(database), HttpStatus.CREATED);
    }

    @GetMapping(value = "/database/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        Optional<Database> db = databaseRepository.findById(id);
        if (db.isPresent()) {
            if (db.get().getUser().getId() == authenticatedUserProvider.getAuthenticatedUserId()) {
                return new ResponseEntity<>(DatabaseDTO.fromDatabase(db.get()), HttpStatus.OK);
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
        List<DatabaseDTO> all = databaseRepository.findAllByUser_Id(authenticatedUserProvider.getAuthenticatedUserId()).stream()
                .map(DatabaseDTO::fromDatabase).collect(Collectors.toList());
        return new ResponseEntity<>(all, HttpStatus.OK);
    }

    @PostMapping(value = "/database/{id}/game")
    public ResponseEntity<?> createGame(@PathVariable Long id) {
        Optional<Database> db = databaseRepository.findById(id);
        if (db.isPresent()) {
            if (db.get().getUser().getId() == authenticatedUserProvider.getAuthenticatedUserId()) {
                Game g = new Game();
                g.setWhiteName("black");
                g.setBlackName("white");
                DbGame dbGame = dbGameFactory.fromGame(g);
                dbGame.setDatabase(db.get());

                DbGame save = dbGameRepository.save(dbGame);
                return new ResponseEntity<>(gameFactory.fromDbGame(save), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/database/{id}/uploadPgn")
    public ResponseEntity<?> importPgn(@PathVariable Long id, @RequestParam("pgnFile") MultipartFile pgnFile) throws IOException {
        Optional<Database> db = databaseRepository.findById(id);
        if (db.isPresent()) {
            if (db.get().getUser().getId() == authenticatedUserProvider.getAuthenticatedUserId()) {
                PgnReader pgnReader = new PgnReader(pgnFile.getInputStream());
                List<Game> games = pgnReader.readGames();
                List<DbGame> dbGames = games.stream().map(dbGameFactory::fromGame).map(g -> {
                    g.setDatabase(db.get());
                    return dbGameRepository.save(g);
                }).collect(Collectors.toList());
                return new ResponseEntity<>(dbGames, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}

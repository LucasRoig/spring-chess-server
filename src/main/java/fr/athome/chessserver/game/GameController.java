package fr.athome.chessserver.game;

import fr.athome.chessserver.auth.AuthenticatedUserProvider;
import fr.athome.chessserver.chess.Game;
import fr.athome.chessserver.chess.GameFactory;
import fr.athome.chessserver.dbchessentity.DbGame;
import fr.athome.chessserver.dbchessentity.DbGameFactory;
import fr.athome.chessserver.dbchessentity.DbGameRepository;
import fr.athome.chessserver.dbchessentity.DbPosition;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
public class GameController {
    private final DbGameRepository gameRepository;
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final GameFactory gameFactory;
    private final DbGameFactory dbGameFactory;

    public GameController(DbGameRepository gameRepository, AuthenticatedUserProvider authenticatedUserProvider,
                          GameFactory gameFactory, DbGameFactory dbGameFactory) {
        this.gameRepository = gameRepository;
        this.authenticatedUserProvider = authenticatedUserProvider;
        this.gameFactory = gameFactory;
        this.dbGameFactory = dbGameFactory;
    }

    @GetMapping(path = "/api/v1/game/{id}")
    public ResponseEntity<?> getGame(@PathVariable long id) {
        Optional<DbGame> game = gameRepository.findById(id);
        if (game.isPresent()) {
            long ownerId = game.get().getDatabase().getUser().getId();
            if (ownerId != authenticatedUserProvider.getAuthenticatedUserId()) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            } else {
                return new ResponseEntity<>(game, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/api/v1/game/{id}")
    public ResponseEntity<?> updateGame(@PathVariable long id, @RequestBody DbGame game) {
        if (game.getId() != id) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<DbGame> dbGame = gameRepository.findById(id);
        if (dbGame.isPresent()) {
            long ownerId = dbGame.get().getDatabase().getUser().getId();
            if (ownerId != authenticatedUserProvider.getAuthenticatedUserId()) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            } else {
                game.setDatabase(dbGame.get().getDatabase());
                if (game.getId() < 0) {
                    throw new IllegalStateException("No id");
                }
                for (DbPosition position : game.getPositions()) {
                    position.setGame(game);
                }
                DbGame updatedDbGame = gameRepository.save(game);
                return new ResponseEntity<>(updatedDbGame, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/api/v1/game/{id}")
    public ResponseEntity<?> deleteGame(@PathVariable long id) {
        Optional<DbGame> dbGame = gameRepository.findById(id);
        if (dbGame.isPresent()) {
            long ownerId = dbGame.get().getDatabase().getUser().getId();
            if (ownerId != authenticatedUserProvider.getAuthenticatedUserId()) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            } else {
                gameRepository.delete(dbGame.get());
                return new ResponseEntity<>(HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}

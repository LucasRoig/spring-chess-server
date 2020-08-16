package fr.athome.chessserver.dbchessentity;

import fr.athome.chessserver.chess.Game;
import fr.athome.chessserver.chess.Position;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class DbGameFactory {
    public DbGame fromGame(Game game) {
        AtomicInteger index = new AtomicInteger(0);
        DbGame dbGame = new DbGame();
        dbGame.setBlackName(game.getBlackName());
        dbGame.setWhiteName(game.getWhiteName());
        visitPosition(game.getStartingPosition(), dbGame, index);
        if (game.getId() >= 0) {
            dbGame.setId(game.getId());
        }
        return dbGame;
    }

    private DbPosition visitPosition(Position position, DbGame dbGame, AtomicInteger index) {
        DbPosition dbPosition = new DbPosition();
        dbPosition.setPositionIndex(index.get());
        dbPosition.setCommentAfter(position.getCommentAfter());
        dbPosition.setCommentBefore(position.getCommentBefore());
        dbPosition.setFen(position.getFen());
        dbPosition.setGame(dbGame);
        dbPosition.setLastMoveSan(position.getLastMoveSan());
        dbPosition.setNags(String.join(";",position.getNags()));
        if (position.getNextPosition() != null) {
            index.incrementAndGet();
            DbPosition nextPosition = visitPosition(position.getNextPosition(), dbGame, index);
            dbPosition.setNextPosition(nextPosition.getPositionIndex());
        }
        List<DbPosition> sublines = new ArrayList<>();
        for (Position subline : position.getSublines()) {
            index.incrementAndGet();
            DbPosition pos = visitPosition(subline,dbGame,index);
            sublines.add(pos);
        }
        if (sublines.isEmpty()) {
            dbPosition.setSublines("");
        } else {
            dbPosition.setSublines(sublines.stream().map(p -> String.valueOf(p.getPositionIndex())).collect(Collectors.joining(";")));
        }
        dbGame.getPositions().add(dbPosition);
        return dbPosition;
    }
}

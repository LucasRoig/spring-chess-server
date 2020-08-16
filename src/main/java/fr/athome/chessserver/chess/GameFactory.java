package fr.athome.chessserver.chess;

import fr.athome.chessserver.dbchessentity.DbGame;
import fr.athome.chessserver.dbchessentity.DbPosition;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class GameFactory {
    public Game fromDbGame(DbGame dbGame) {
        Game g = new Game();
        g.setWhiteName(dbGame.getWhiteName());
        g.setBlackName(dbGame.getBlackName());
        if (dbGame.getPositions().size() > 0) {
            DbPosition[] dbPositions = new DbPosition[dbGame.getPositions().size()];
            for (DbPosition position : dbGame.getPositions()) {
                dbPositions[position.getPositionIndex()] = position;
            }
            g.setStartingPosition(parsePosition(dbPositions, 0));
        }
        g.setId(dbGame.getId());
        return g;
    }

    private Position parsePosition(DbPosition[] dbPositions, int index) {
        DbPosition dbPosition = dbPositions[index];
        Position p = new Position(dbPosition.getFen());
        p.setLastMoveSan(dbPosition.getLastMoveSan());
        p.setCommentAfter(dbPosition.getCommentAfter());
        p.setCommentBefore(dbPosition.getCommentBefore());
        p.getNags().addAll(Arrays.asList(dbPosition.getNags().split(";")));
        if (dbPosition.getNextPosition() > 0) {
            Position nextPosition = parsePosition(dbPositions, dbPosition.getNextPosition());
            nextPosition.setPreviousPosition(p);
            p.setNextPosition(nextPosition);
        }
        if (!dbPosition.getSublines().isEmpty()) {
            for (String i : dbPosition.getSublines().split(";")) {
                Position subline = parsePosition(dbPositions, Integer.parseInt(i));
                subline.setPreviousPosition(p);
                p.getSublines().add(subline);
            }
        }
        return p;
    }
}

package fr.athome.chessserver.chess;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Game {
    private static String STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    private String whiteName = "";
    private String blackName = "";
    private List<Position> positions = new ArrayList<>();
    private Position startingPosition;
    private Map<String,String> headers = new HashMap<>();
    private long id = -1;

    public Game() {
        this.startingPosition = new Position(STARTING_FEN);
    }

    public Game(Position startingPosition) {
        this.startingPosition = startingPosition;
    }

    public void setStartingPosition(Position startingPosition) {
        this.startingPosition = startingPosition;
    }

    public void setWhiteName(String whiteName) {
        this.whiteName = whiteName;
    }

    public void setBlackName(String blackName) {
        this.blackName = blackName;
    }

    public Position getStartingPosition() {
        return startingPosition;
    }

    public Map<String, String> getHeaders() {
        return headers;
    }

    public String getWhiteName() {
        return whiteName;
    }

    public String getBlackName() {
        return blackName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}

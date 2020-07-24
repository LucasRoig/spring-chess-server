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

    public Game() {
        this.startingPosition = new Position(STARTING_FEN);
    }

    public Game(Position startingPosition) {
        this.startingPosition = startingPosition;
    }

    public Position getStartingPosition() {
        return startingPosition;
    }

    public Map<String, String> getHeaders() {
        return headers;
    }
}

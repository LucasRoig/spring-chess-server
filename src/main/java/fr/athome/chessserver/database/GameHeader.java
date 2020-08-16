package fr.athome.chessserver.database;

import fr.athome.chessserver.dbchessentity.DbGame;

import java.util.HashMap;
import java.util.Map;

public class GameHeader {
    private String whiteName;
    private String blackName;
    private long id;
//    private Map<String,String> headers = new HashMap<>();

    public static GameHeader fromGame(DbGame dbGame) {
        GameHeader h = new GameHeader();
        h.setBlackName(dbGame.getBlackName());
        h.setWhiteName(dbGame.getWhiteName());
        h.setId(dbGame.getId());
//        h.setHeaders(dbGame.get);
        return h;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public String getWhiteName() {
        return whiteName;
    }

    public void setWhiteName(String whiteName) {
        this.whiteName = whiteName;
    }

    public String getBlackName() {
        return blackName;
    }

    public void setBlackName(String blackName) {
        this.blackName = blackName;
    }
//
//    public Map<String, String> getHeaders() {
//        return headers;
//    }
//
//    public void setHeaders(Map<String, String> headers) {
//        this.headers = headers;
//    }
}

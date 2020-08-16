package fr.athome.chessserver.database;

import fr.athome.chessserver.dbchessentity.DbGame;

import java.util.ArrayList;
import java.util.List;

public class DatabaseDTO {
    private String name;
    private List<GameHeader> gameHeaders = new ArrayList<>();
    private long id;

    public static DatabaseDTO fromDatabase(Database database) {
        DatabaseDTO dto = new DatabaseDTO();
        dto.setId(database.getId());
        dto.setName(database.getName());
        if (database.getGames() != null) {
            for (DbGame game : database.getGames()) {
                dto.getGameHeaders().add(GameHeader.fromGame(game));
            }
        }
        return dto;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<GameHeader> getGameHeaders() {
        return gameHeaders;
    }

    public void setGameHeaders(List<GameHeader> gameHeaders) {
        this.gameHeaders = gameHeaders;
    }
}

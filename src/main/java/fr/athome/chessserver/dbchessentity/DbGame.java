package fr.athome.chessserver.dbchessentity;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.athome.chessserver.database.Database;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class DbGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id = -1;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Database database;
    @OneToMany(
            mappedBy = "game",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Column(nullable = false)
    private List<DbPosition> positions = new ArrayList<>();
    private String whiteName;
    private String blackName;

    public long getId() {
        return id;
    }

    public Database getDatabase() {
        return database;
    }

    public void setDatabase(Database database) {
        this.database = database;
    }

    public List<DbPosition> getPositions() {
        return positions;
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

    public void setId(long id) {
        this.id = id;
    }
}

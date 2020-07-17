package fr.athome.chessserver.database;

import com.fasterxml.jackson.annotation.JsonProperty;
import fr.athome.chessserver.user.User;

import javax.persistence.*;

@Entity(name = "chessdatabase")
public class Database {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String name;
    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User user;

    protected Database() {
    }

    public Database(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

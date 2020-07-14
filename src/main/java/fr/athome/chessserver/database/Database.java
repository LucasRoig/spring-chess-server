package fr.athome.chessserver.database;

import fr.athome.chessserver.user.User;

import javax.persistence.*;

@Entity(name = "chessdatabase")
public class Database {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @ManyToOne
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

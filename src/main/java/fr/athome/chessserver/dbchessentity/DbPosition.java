package fr.athome.chessserver.dbchessentity;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class DbPosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private int positionIndex;
    @Column(nullable = false)
    private String fen;
    private String lastMoveSan;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private DbGame game;
    @Column(nullable = false)
    private String commentBefore = "";
    @Column(nullable = false)
    private String commentAfter = "";
    @Column(nullable = false)
    private String nags = "";
    @Column(nullable = false)
    private String sublines = "";
    private int nextPosition;

    public void setPositionIndex(int positionIndex) {
        this.positionIndex = positionIndex;
    }

    public void setFen(String fen) {
        this.fen = fen;
    }

    public void setLastMoveSan(String lastMoveSan) {
        this.lastMoveSan = lastMoveSan;
    }

    public void setGame(DbGame game) {
        this.game = game;
    }

    public void setCommentBefore(String commentBefore) {
        this.commentBefore = commentBefore;
    }

    public void setCommentAfter(String commentAfter) {
        this.commentAfter = commentAfter;
    }

    public void setNags(String nags) {
        this.nags = nags;
    }

    public void setSublines(String sublines) {
        this.sublines = sublines;
    }

    public void setNextPosition(int nextPosition) {
        this.nextPosition = nextPosition;
    }

    public long getId() {
        return id;
    }

    public int getPositionIndex() {
        return positionIndex;
    }

    public String getFen() {
        return fen;
    }

    public String getLastMoveSan() {
        return lastMoveSan;
    }

    public DbGame getGame() {
        return game;
    }

    public String getCommentBefore() {
        return commentBefore;
    }

    public String getCommentAfter() {
        return commentAfter;
    }

    public String getNags() {
        return nags;
    }

    public String getSublines() {
        return sublines;
    }

    public int getNextPosition() {
        return nextPosition;
    }
}

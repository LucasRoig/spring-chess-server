package fr.athome.chessserver.chess;

import java.util.ArrayList;
import java.util.List;

public class Position {
   private final String fen;
   private String lastMoveSan;
   private Position previousPosition;
   private Position nextPosition = null;
   private String commentBefore = "";
   private String commentAfter = "";
   private final List<Position> sublines = new ArrayList<>();
   private final List<String> nags = new ArrayList<>();

    public Position(String fen, String lastMoveSan, Position previousPosition) {
        this.fen = fen;
        this.lastMoveSan = lastMoveSan;
        this.previousPosition = previousPosition;
    }

    public Position(String fen) {
        this.fen = fen;
        this.lastMoveSan = "";
        this.previousPosition = null;
    }

    public Position getNextPosition() {
        return nextPosition;
    }

    public void setNextPosition(Position nextPosition) {
        this.nextPosition = nextPosition;
    }

    public String getCommentBefore() {
        return commentBefore;
    }

    public void setCommentBefore(String commentBefore) {
        this.commentBefore = commentBefore;
    }

    public String getCommentAfter() {
        return commentAfter;
    }

    public void setCommentAfter(String commentAfter) {
        this.commentAfter = commentAfter;
    }

    public String getFen() {
        return fen;
    }

    public String getLastMoveSan() {
        return lastMoveSan;
    }

    public Position getPreviousPosition() {
        return previousPosition;
    }

    public List<Position> getSublines() {
        return sublines;
    }

    public List<String> getNags() {
        return nags;
    }

    public void setPreviousPosition(Position previousPosition) {
        this.previousPosition = previousPosition;
    }

    public void setLastMoveSan(String lastMoveSan) {
        this.lastMoveSan = lastMoveSan;
    }
}

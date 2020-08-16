package fr.athome.chessserver.chess.pgn;

import com.github.bhlangonijr.chesslib.Board;
import com.github.bhlangonijr.chesslib.move.MoveConversionException;
import com.github.bhlangonijr.chesslib.move.MoveList;
import fr.athome.chessserver.chess.Game;
import fr.athome.chessserver.chess.Position;
import org.apache.logging.log4j.util.Strings;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;

public class PgnReader {
    private final BufferedReader reader;
    private ArrayDeque<String> tokens = new ArrayDeque<>();
    private Stack<Position> variationsQueue = new Stack<>();
    private boolean endOfFile = false;
    private List<Game> games = new ArrayList<>();
    private Game currentGame;
    private Position currentPosition;
    private Board pgnPosition;
    private boolean startVariation = false;
    private String commentBeforeNextMove = null;

    public PgnReader(InputStream in) {
        this.reader = new BufferedReader(new InputStreamReader(in));
    }

    public List<Game> readGames() throws IOException {
        games = new ArrayList<>();
        while(!endOfFile) {
            Game game = readGame();
            if (game != null) {
                games.add(game);
            }
        }
        return games;
    }

    private Game readGame() throws IOException {
        variationsQueue.clear();
        tokens.clear();
        startVariation = false;
        currentGame = new Game();
        readHeaders();
        for (Map.Entry<String, String> header : currentGame.getHeaders().entrySet()) {
            if (header.getKey().equalsIgnoreCase("White")) {
                currentGame.setWhiteName(header.getValue());
            } else if (header.getKey().equalsIgnoreCase("Black")) {
                currentGame.setBlackName(header.getValue());
            } else if (header.getKey().equalsIgnoreCase("FEN")) {
                Position p = new Position(header.getValue());
                currentGame.setStartingPosition(p);
            }
        }
        currentPosition = currentGame.getStartingPosition();
        pgnPosition = new Board();
        pgnPosition.loadFromFen(currentPosition.getFen());
        if (endOfFile && tokens.isEmpty()) {
            return null;
        }
        readMoves();
        return currentGame;
    }

    private boolean isStartOfComment() {
        return tokens.peekFirst().equals("{");
    }

    private boolean isStartOfSubLine() {
        return tokens.peekFirst().equals("(");
    }

    private boolean isEndOfSubline() {
        return tokens.peekFirst().equals(")");
    }

    private boolean isMoveNumber() {
        return tokens.peekFirst().matches("[0-9]+\\.(\\.\\.)?");
    }

    private boolean isNag() {
        return tokens.peekFirst().startsWith("$");
    }
    private boolean isGameResult() {
        String peek = tokens.peekFirst();
        return peek.equals("1-0") || peek.equals("0-1") || peek.equals("1/2-1/2") || peek.equals("*");
    }




    private void readMoves() throws IOException {
        try {
                while(!tokens.isEmpty()) {
                    if (isStartOfComment()) {
                        commentBeforeNextMove = parseComment();
                    } else if (isStartOfSubLine()) {
                        tokens.poll();
                        this.startVariation = true;
                        variationsQueue.push(currentPosition);
                        currentPosition = currentPosition.getPreviousPosition();
                        pgnPosition.loadFromFen(currentPosition.getFen());
                    } else if (isEndOfSubline()) {
                        tokens.poll();
                        this.startVariation = false;
                        currentPosition = variationsQueue.pop();
                        pgnPosition.loadFromFen(currentPosition.getFen());
                    } else if (isMoveNumber()) {
                        // Nothing
                        tokens.poll();
                    } else if (isNag()) {
                        throw new IOException("Misplaced nag " + tokens.peek());
                    } else if (isGameResult()) {
                        tokens.clear();
                        //TODO
                        return;
                    } else {
                        //it should be a move
                        parseMove();
                    }
                    if (tokens.isEmpty()) {
                        readLine();
                    }
                }
                readLine();

        } catch (MoveConversionException e) {
            throw new IOException(e);
        }
    }

    private void parseMove() throws MoveConversionException, IOException {
        String san = tokens.poll();
        MoveList moveList = new MoveList(currentPosition.getFen());
        moveList.addSanMove(san, true, true);
        pgnPosition.doMove(moveList.getFirst());
        Position newPosition = new Position(pgnPosition.getFen(),san,currentPosition);
        if (commentBeforeNextMove != null && !commentBeforeNextMove.isEmpty()) {
            newPosition.setCommentBefore(commentBeforeNextMove);
            commentBeforeNextMove = null;
        }
        if (startVariation) {
            startVariation = false;
            currentPosition.getSublines().add(newPosition);
        } else {
            currentPosition.setNextPosition(newPosition);
        }
        if (tokens.isEmpty() && !endOfFile) {
            readLine();
        }
        while (tokens.peek() != null && isNag()) {
            String nag = tokens.pop();
            newPosition.getNags().add(nag);
            if (tokens.isEmpty() && !endOfFile) {
                readLine();
            }
        }
        if (tokens.peek() != null && isStartOfComment()) {
            String s = parseComment();
            newPosition.setCommentAfter(s);
        }

        currentPosition = newPosition;
        //TODO Comment and nags
    }

    private String parseComment() throws IOException {
        List<String> comment = new ArrayList<>();
        tokens.poll();
        if (tokens.isEmpty()) {
            readLine();
        }
        while (!tokens.isEmpty()) {
            String poll = tokens.poll();
            if (poll.equals("}")) {
                //TODO add comment to position
                return String.join(" ",comment);
            } else {
                comment.add(poll);
            }
            if (tokens.isEmpty()) {
                readLine();
            }
        }
        throw new IOException("Comment has no end " + comment.toString());
    }

    private void readHeaders() throws IOException {
        while (!endOfFile) {
            readLine();
            if (tokens.isEmpty()) {
                return;
            }
            if (isHeader()) {
                parseHeader();
            } else {
                return;
            }
        }
    }

    private void parseHeader() {
        if (!tokens.peekFirst().equals("[")){
            throw new IllegalStateException("This is not a header");
        }
        tokens.poll(); //remove [
        List<String> title = new ArrayList<>();
        while (!tokens.peek().equals("\"")) {
            title.add(tokens.poll());
        }
        tokens.poll(); // remove "
        List<String> value = new ArrayList<>();
        while (!tokens.peek().equals("\"")) {
            value.add(tokens.poll());
        }
        tokens.clear();
        currentGame.getHeaders().put(String.join(" ", title), String.join(" ",value));
    }

    private boolean isHeader() {
        return tokens.peekFirst().equals("[") && tokens.peekLast().equals("]");
    }

    private void readLine() throws IOException {
        String line = reader.readLine();
        if (line == null) {
            endOfFile = true;
            return;
        }
        line = line.replaceAll("\\(", " ( ");
        line = line.replaceAll("\\)", " ) ");
        line = line.replaceAll("\\{", " { ");
        line = line.replaceAll("\\}", " } ");
        line = line.replaceAll("\\[", " [ ");
        line = line.replaceAll("\\]", " ] ");
        line = line.replaceAll("\"", " \" ");
        line = line.replaceAll(" {2}"," ");
        line = line.replace('\uFEFF',' ');
        tokens = Arrays.stream(line.split(" ")).map(String::trim).filter(s -> !s.isEmpty())
                .collect(Collectors.toCollection(ArrayDeque::new));
        if (tokens.isEmpty()) {
            readLine();
        }
    }
}

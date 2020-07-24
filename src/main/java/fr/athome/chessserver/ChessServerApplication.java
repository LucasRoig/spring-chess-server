package fr.athome.chessserver;

import fr.athome.chessserver.chess.Game;
import fr.athome.chessserver.chess.pgn.PgnReader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;


@SpringBootApplication
public class ChessServerApplication {

    public static void main(String[] args) throws IOException {
        SpringApplication.run(ChessServerApplication.class, args);
        PgnReader pgnReader = new PgnReader(new FileInputStream("game1.pgn"));
        List<Game> games = pgnReader.readGames();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

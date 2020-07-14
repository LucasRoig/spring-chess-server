package fr.athome.chessserver.database;

import fr.athome.chessserver.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DatabaseRepository extends JpaRepository<Database, Long> {
    List<Database> findAllByUser_Id(long userId);

}

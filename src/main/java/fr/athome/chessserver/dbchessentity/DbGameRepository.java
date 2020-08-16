package fr.athome.chessserver.dbchessentity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DbGameRepository extends JpaRepository<DbGame, Long> {
}

package com.cchub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cchub.dto.WatchlistDTO;
import com.cchub.entities.Cart;
import com.cchub.entities.Watchlist;


public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {
	@Query("SELECT w FROM Watchlist w WHERE w.student.student_id = :studentId")
    Watchlist findByStudentId(@Param("studentId") Long studentId);

	
	
	
}

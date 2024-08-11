package com.blogs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogs.dto.WatchlistDTO;
import com.blogs.entities.Watchlist;


public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {

}

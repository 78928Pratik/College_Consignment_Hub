package com.cchub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cchub.dto.RatingDTO;
import com.cchub.entities.Rating;


public interface RatingRepository extends JpaRepository<Rating, Long> {

}

package com.cchub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cchub.dto.CategoryDTO;
import com.cchub.entities.Category;


public interface CategoryRepository extends JpaRepository<Category, Long> 
{

}

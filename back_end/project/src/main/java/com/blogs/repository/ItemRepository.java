package com.blogs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogs.dto.ItemDTO;
import com.blogs.entities.Item;


public interface ItemRepository extends JpaRepository<Item, Long> {

}

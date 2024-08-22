package com.cchub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cchub.dto.Donate_ItemDTO;
import com.cchub.entities.Donate_Item;

public interface Donate_ItemRepository extends JpaRepository<Donate_Item, Long> {

}

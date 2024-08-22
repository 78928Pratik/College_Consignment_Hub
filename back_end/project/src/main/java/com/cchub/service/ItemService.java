package com.cchub.service;

import java.util.List;

import com.cchub.dto.ItemDTO;
import com.cchub.entities.Item;

public interface ItemService 
{
	// Add a new item
    void addItem(ItemDTO itemDTO);

    // Get an item by ID
    ItemDTO getItemById(Long id);

    // Get all items
    List<ItemDTO> getAllItems();

    // Update an item
    void updateItem(Long id, ItemDTO itemDTO);

    // Delete an item by ID
    void deleteItem(Long id);
    

	List<Item> getItemsByWatchlistId(Long id);

	List<Item> getItemsByCartId(Long cartId);
}

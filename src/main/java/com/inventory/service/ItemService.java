package com.inventory.service;

import java.util.List;

import com.inventory.entity.Item;

public interface ItemService {
	void saveItem(Item item);
	void updateItem(Item item);
	Item findItem(Long id);
	List<Item> findAllItems();
}

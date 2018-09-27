package com.inventory.dao;

import java.util.List;

import com.inventory.entity.Item;

public interface ItemDao {

	void saveItem(Item item);
	void updateItem(Item item);
	Item findItem(Long id);
	List<Item> findAllItem();
}

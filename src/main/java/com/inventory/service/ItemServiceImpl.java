package com.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inventory.dao.ItemDao;
import com.inventory.entity.Item;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

	@Autowired
	private ItemDao itemDao;
	
	@Override
	public void saveItem(Item item) {
		itemDao.saveItem(item);
	}

	@Override
	public void updateItem(Item item) {
		itemDao.updateItem(item);
	}

	@Override
	public Item findItem(Long id) {
		return itemDao.findItem(id);
	}

	@Override
	public List<Item> findAllItems() {
		return itemDao.findAllItems();
	}

}

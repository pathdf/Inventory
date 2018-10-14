package com.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inventory.dao.ItemDao;
import com.inventory.entity.Item;

@Service
public class ItemServiceImpl implements ItemService {

	@Autowired
	private ItemDao itemDao;

	@Override
	@Transactional
	public void saveItem(Item item) {
		itemDao.saveItem(item);
	}

	@Override
	@Transactional
	public void updateItem(Item item) {
		itemDao.updateItem(item);
	}

	@Override
	@Transactional(readOnly=true)
	public Item findItem(Long id) {
		return itemDao.findItem(id);
	}

	@Override
	@Transactional(readOnly=true)
	public List<Item> findAllItems() {
		return itemDao.findAllItems();
	}

	@Override
	@Transactional(readOnly=true)
	public List<Item> findItemsByName(String itemName) {
		return itemDao.findItemsByName(itemName);
	}
}

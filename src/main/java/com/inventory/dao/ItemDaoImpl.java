package com.inventory.dao;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.inventory.entity.Item;

@Repository
public class ItemDaoImpl implements ItemDao {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void saveItem(Item item) {
		sessionFactory.getCurrentSession().save(item);
	}

	@Override
	public void updateItem(Item item) {
		sessionFactory.getCurrentSession().update(item);
	}

	@Override
	public Item findItem(Long id) {
		return (Item) sessionFactory.getCurrentSession().get(Item.class, id);
	}

	@Override
	public List<Item> findAllItems() {
		return sessionFactory.getCurrentSession().createCriteria(Item.class)
				.list();
	}

	@Override
	public List<Item> findItemsByName(String itemName) {
		if(StringUtils.isNotBlank(itemName)){
			itemName+="%";
		}
		return (List<Item>) sessionFactory.getCurrentSession()
				.createQuery("FROM Item i WHERE UPPER(i.itemName) LIKE UPPER(:itemName)")
				.setParameter("itemName", itemName).list();
	}

}

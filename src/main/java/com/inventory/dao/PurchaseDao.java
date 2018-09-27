package com.inventory.dao;

import java.util.List;

import com.inventory.entity.Purchase;

public interface PurchaseDao {

	void savePurchase(Purchase purchase);
	void updatePurchase(Purchase purchase);
	Purchase findPurchase(Long id);
	List<Purchase> findAllPurchase();
}

package com.inventory.dao;

import java.util.List;

import com.inventory.entity.Vendor;

public interface VendorDao {

	void saveVendor(Vendor vendor);
	void updateVendor(Vendor vendor);
	Vendor findVendor(Long id);
	List<Vendor> findAllVendors();
}

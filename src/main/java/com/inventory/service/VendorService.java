package com.inventory.service;

import java.util.List;

import com.inventory.entity.Vendor;
import com.inventory.ui.bean.VendorBean;

public interface VendorService {
	void saveVendor(Vendor vendor);
	void updateVendor(Vendor vendor);
	Vendor findVendor(Long id);
	List<Vendor> findAllVendors();
	Vendor findVendorByName(String name);
	List<VendorBean> getAllVendorBeans();
	void delete(Vendor vendor);
}

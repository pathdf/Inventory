package com.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inventory.converters.VendorConverter;
import com.inventory.dao.VendorDao;
import com.inventory.entity.Vendor;
import com.inventory.ui.bean.VendorBean;

@Service
public class VendorServiceImp implements VendorService {

	@Autowired
	private VendorDao vendorDao;
	
	@Override
	@Transactional
	public void saveVendor(Vendor vendor) {
		vendorDao.saveVendor(vendor);
	}

	@Override
	@Transactional
	public void updateVendor(Vendor vendor) {
		vendorDao.updateVendor(vendor);
	}

	@Override
	@Transactional(readOnly=true)
	public Vendor findVendor(Long id) {
		return vendorDao.findVendor(id);
	}

	@Override
	@Transactional(readOnly=true)
	public List<Vendor> findAllVendors() {
		return vendorDao.findAllVendors();
	}

	@Override
	@Transactional(readOnly=true)
	public Vendor findVendorByName(String name) {
		return vendorDao.findVendorByName(name);
	}

	@Override
	@Transactional(readOnly=true)
	public List<VendorBean> getAllVendorBeans(){
		return VendorConverter.getUIBeanListFromEntityList(vendorDao.findAllVendors());
	}
	
	@Override
	@Transactional
	public void delete(Vendor vendor) {
		vendorDao.delete(vendor);
	}

	@Override
	@Transactional(readOnly=true)
	public List<Object[]> getAllVendorWithItems(int from, int pageSize) {
		return vendorDao.getAllVendorWithItems(from,pageSize);
	}

	@Override
	@Transactional(readOnly=true)
	public List<Object[]> getAllVendorWithItems() {
		return vendorDao.getAllVendorWithItems();
	}
		
}

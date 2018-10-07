package com.inventory.converters;

import com.inventory.entity.Vendor;
import com.inventory.ui.bean.VendorBean;

public class VendorConverter {

	public static Vendor getEntityFromUIBean(VendorBean vendorBean){
		Vendor vendor = null;
		if (vendorBean != null) {
			vendor = new Vendor();
			vendor.setVendorName(vendorBean.getVendorName());
			vendor.setAddress(vendorBean.getVendorAddress());
			vendor.setContactNo(vendorBean.getVendorContactNo());
			vendor.setStatus("Active");
			
		}
		return vendor;
	}
}

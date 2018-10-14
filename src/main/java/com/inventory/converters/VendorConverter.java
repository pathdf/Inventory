package com.inventory.converters;

import java.util.ArrayList;
import java.util.List;

import com.inventory.entity.Item;
import com.inventory.entity.Vendor;
import com.inventory.ui.bean.ItemBean;
import com.inventory.ui.bean.VendorBean;

public class VendorConverter {

	public static Vendor getEntityFromUIBean(VendorBean vendorBean){
		Vendor vendor = null;
		if (vendorBean != null) {
			vendor = new Vendor();
			vendor.setVendorId(vendorBean.getVendorId());
			vendor.setVendorName(vendorBean.getVendorName());
			vendor.setAddress(vendorBean.getVendorAddress());
			vendor.setContactNo(vendorBean.getVendorContactNo());
			vendor.setStatus("Active");
			
		}
		return vendor;
	}
	
	public static List<VendorBean> getUIBeanListFromEntityList(List<Vendor> vendors){
		List<VendorBean> vendorBeans = null;
		if(vendors !=null){
			vendorBeans = new ArrayList<VendorBean>();
			VendorBean vendorBean = null;
			for(Vendor vendor : vendors){
				vendorBean = new VendorBean();
				vendorBean.setVendorId(vendor.getVendorId());
				vendorBean.setVendorName(vendor.getVendorName());
				vendorBean.setVendorAddress(vendor.getAddress());
				vendorBean.setVendorContactNo(vendor.getContactNo());
				List<ItemBean> itemBeans = null;
				if(vendor.getItems() != null){
					itemBeans = new ArrayList<ItemBean>();
					ItemBean itemBean = null;
					for(Item item : vendor.getItems()){
						itemBean = new ItemBean();
						itemBean.setItemId(item.getItemId());
						itemBean.setItemName(item.getItemName());
						itemBean.setStatus(item.getStatus());
						itemBeans.add(itemBean);
					}
				
				}
				vendorBean.setItemBeans(itemBeans);
				vendorBeans.add(vendorBean);
			}
		}
		return vendorBeans;
	}
}

package com.inventory.converters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.CollectionUtils;

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
			vendor.setVendorName(vendorBean.getVendorName().trim());
			vendor.setAddress(vendorBean.getVendorAddress().trim());
			vendor.setContactNo(vendorBean.getVendorContactNo().trim());
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
	
	public static List<VendorBean> getUiBeanListFromEntityArrayList(List<Object[]> objects){
		List<VendorBean> vendorBeans = null;
		if(!CollectionUtils.isEmpty(objects)){
			vendorBeans = new ArrayList<VendorBean>();
			VendorBean vendorBean = null;
			for(Object[] object : objects){
				vendorBean = new VendorBean();
				vendorBean.setVendorId((Long)object[0]);
				vendorBean.setVendorName((String)object[1]);
				vendorBean.setVendorAddress((String)object[2]);
				vendorBean.setVendorContactNo((String)object[3]);
				vendorBean.setItemId((Long)object[4]);
				vendorBean.setItemName((String)object[5]);
				vendorBeans.add(vendorBean);
			}
		}
		return vendorBeans;
	}
}

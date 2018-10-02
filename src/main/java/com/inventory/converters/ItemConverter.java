package com.inventory.converters;

import java.util.ArrayList;
import java.util.List;

import com.inventory.entity.Item;
import com.inventory.ui.bean.ItemBean;

public class ItemConverter {
	
	public static Item getEntityFromUIBean(ItemBean itemBean){
		Item item = null;
		if(itemBean != null){
			item = new Item();
			item.setItemName(itemBean.getItemName());
			item.setStatus(itemBean.getStatus());
		}
		return item;
	}
	
	public static ItemBean getUIBeanFromEntity(Item item){
		ItemBean itemBean = null;
		if(item != null){
			itemBean = new ItemBean();
			itemBean.setItemName(item.getItemName());
			itemBean.setStatus(item.getStatus());
		}
		return itemBean;
	}
	
	public static List<ItemBean> getUIBeanListFromEntityList(List<Item> items){
		List<ItemBean> itemBeans = null;
		if(items != null){
			itemBeans = new ArrayList<ItemBean>();
			for(Item item : items){
				ItemBean itemBean = null;
				if(item != null){
					itemBean = new ItemBean();
					itemBean.setItemName(item.getItemName());
					itemBean.setItemId(item.getItemId());
					itemBean.setStatus(item.getStatus());
					itemBeans.add(itemBean);
				}
			}
		}
		
		return itemBeans;
	}

}

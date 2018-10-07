package com.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.inventory.converters.ItemConverter;
import com.inventory.entity.Item;
import com.inventory.service.ItemService;
import com.inventory.ui.bean.ItemBean;
@Controller
public class ItemController {

	@Autowired
	private ItemService itemService;
	
	@Autowired
	private MessageSource messageSource;
	
	@RequestMapping(value="/getItems.do", method = RequestMethod.POST)
	public @ResponseBody List<ItemBean> getItemsByName(
			@RequestBody ItemBean itemBean) {
		List<Item> items = itemService.findItemsByName(itemBean.getItemName());
		List<ItemBean> itemBeans = null;
		if (items != null) {
			itemBeans = ItemConverter.getUIBeanListFromEntityList(items);
		}
		return itemBeans;
	}
}

package com.inventory.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.inventory.service.ItemService;
import com.inventory.ui.bean.ItemBean;

@Controller
public class ItemController {

	@Autowired
	private ItemService itemService;
	
	@RequestMapping(value="/getItemStatus.do", method = RequestMethod.POST)
	public @ResponseBody ItemBean getItemStatus(@RequestBody ItemBean item){
		
		return new ItemBean();

	}
}

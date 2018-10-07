package com.inventory.controller;

import java.lang.invoke.MethodType;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.inventory.ajax.response.Message;
import com.inventory.converters.ItemConverter;
import com.inventory.entity.Item;
import com.inventory.service.ItemService;
import com.inventory.ui.bean.ItemBean;
import com.inventory.ui.bean.VendorBean;

@Controller
public class VendorController {
	
	@RequestMapping(value="/saveVendor.do",method=RequestMethod.POST)
	public @ResponseBody Message saveVendor(@RequestBody VendorBean vendorBean){
		Message message = new Message();
		if(vendorBean == null){
			return message;
		}else{
			return message;
		}
	}
}

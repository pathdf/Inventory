package com.inventory.controller;

import java.lang.invoke.MethodType;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.inventory.ajax.response.Message;
import com.inventory.converters.ItemConverter;
import com.inventory.converters.VendorConverter;
import com.inventory.entity.Item;
import com.inventory.entity.Vendor;
import com.inventory.service.ItemService;
import com.inventory.service.VendorService;
import com.inventory.ui.bean.ItemBean;
import com.inventory.ui.bean.VendorBean;
import com.inventory.util.Regex;

@Controller
public class VendorController {
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private VendorService vendorService;
	
	@Autowired
	private ItemService itemService;
	
	private final String ALPHANUEMRIC_WITHOUT_CHARACTERS_REGEX="^[a-zA-Z0-9]+[a-zA-Z0-9\\s\\x21-\\x24\\x26-\\x2F\\x40\\x5C\\x60]*$";
	private final String NUMERIC_REGEX="^[0-9]+$";
	
	@Value("${paging.max.records}")
	private String maxRecords;
	
	@RequestMapping(value="/saveVendor.do",method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> saveVendor(@RequestBody VendorBean vendorBean){
		Map<String,	Object> jsonMap = new HashMap<String, Object>();
		Map<String, String> errorMap = new HashMap<String, String>();
		if(vendorBean == null){
			putAllVendorBeanError(errorMap);
			jsonMap.put("error", errorMap);
		} else if(!validateVendorBean(vendorBean, errorMap)){
			jsonMap.put("error", errorMap);
		}else if(validateVendorNameInDb(vendorBean)){
			jsonMap.put("error", messageSource.getMessage("vendor.name.is.already.present.in.db", null, Locale.US));
		} else{
			Vendor vendor = VendorConverter.getEntityFromUIBean(vendorBean);
			Item item = new Item();
			item.setItemName(vendorBean.getItemName());
			if (vendorBean.getItemId() == null) {
				item.setStatus("Active");
				itemService.saveItem(item);
			}else{
				item.setItemId(vendorBean.getItemId());
			}
			vendor.getItems().add(item);
			vendorService.saveVendor(vendor);
			jsonMap.put("message",messageSource.getMessage("message.create.vendor", null, Locale.US));
		}
		return jsonMap;
	}
	
	public boolean validateVendorBean(VendorBean vendorBean, Map<String,String> errorMap){
		boolean flag = true;
		if(StringUtils.isBlank(vendorBean.getVendorName()) || !Regex.isValidValue(vendorBean.getItemName(), ALPHANUEMRIC_WITHOUT_CHARACTERS_REGEX)){
			errorMap.put("vendorNameError",messageSource.getMessage("vendor.name.cannot.blank", null, Locale.US));
			flag = false;
		}
		if(StringUtils.isBlank(vendorBean.getVendorAddress()) || !Regex.isValidValue(vendorBean.getVendorAddress(), ALPHANUEMRIC_WITHOUT_CHARACTERS_REGEX)){
			errorMap.put("vendorAddressError",messageSource.getMessage("vendor.address.cannot.blank", null, Locale.US));
			flag = false;
		}
		if(StringUtils.isBlank(vendorBean.getVendorContactNo()) || !Regex.isValidValue(vendorBean.getVendorContactNo(), NUMERIC_REGEX)){
			errorMap.put("vendorContactNoError",messageSource.getMessage("vendor.contact.no.cannot.blank", null, Locale.US));
			flag = false;
		}
		if(StringUtils.isBlank(vendorBean.getItemName()) || !Regex.isValidValue(vendorBean.getItemName(), ALPHANUEMRIC_WITHOUT_CHARACTERS_REGEX)){
			errorMap.put("itemNameError",messageSource.getMessage("item.name.cannot.blank", null, Locale.US));
			flag = false;
		}
		return flag;
	}
	
	public void putAllVendorBeanError(Map<String,String> errorMap){
		errorMap.put("vendorNameError",messageSource.getMessage("vendor.name.cannot.blank", null, Locale.US));
		errorMap.put("vendorAddressError",messageSource.getMessage("vendor.address.cannot.blank", null, Locale.US));
		errorMap.put("vendorContactNoError", messageSource.getMessage("vendor.contact.no.cannot.blank", null, Locale.US));
		errorMap.put("itemNameError", messageSource.getMessage("item.name.cannot.blank", null, Locale.US));
	}
	
	public boolean validateVendorNameInDb(VendorBean vendorBean){
		Vendor vendor = vendorService.findVendorByName(vendorBean.getVendorName());
		if(vendor != null){
			return true;
		}
		return false;
	}
	
	@RequestMapping(value="/viewVendor.do",method=RequestMethod.GET)
	public ModelAndView getAllVendors(HttpServletRequest req,
			HttpServletResponse res, 
			@RequestParam(value="from", required=false)String from,
			@RequestParam(value="pageSize", required=false)String pageSize) {
		if(StringUtils.isBlank(from)){
			from ="0";
		}
		if(StringUtils.isBlank(pageSize)){
			pageSize = this.maxRecords;
		}
		
		ModelAndView model = new ModelAndView();
		List<Object[]> vendorsCount = vendorService.getAllVendorWithItems();
		List<Object[]> vendors = vendorService.getAllVendorWithItems(Integer.parseInt(from), Integer.parseInt(pageSize));
		List<VendorBean> vendorBeans = VendorConverter.getUiBeanListFromEntityArrayList(vendors);
		model.addObject("vendorBeans", vendorBeans);
		model.addObject("records", vendorsCount.size());
		model.setViewName("viewVendor");
		return model;
	}
	
	@RequestMapping(value="/restrictedViewVendor.do", method=RequestMethod.GET)
	public @ResponseBody List<VendorBean> getRestrictedData(
			@RequestParam(value="from", required=false)String from,
			@RequestParam(value="pageSize", required=false)String pageSize){
		if(StringUtils.isBlank(from)){
			from ="0";
		}
		if(StringUtils.isBlank(pageSize)){
			pageSize = this.maxRecords;
		}
		
		ModelAndView model = new ModelAndView();
		List<Object[]> vendors = vendorService.getAllVendorWithItems(Integer.parseInt(from), Integer.parseInt(pageSize));
		List<VendorBean> vendorBeans = VendorConverter.getUiBeanListFromEntityArrayList(vendors);
		return vendorBeans;
	}
	
	@RequestMapping(value="/updateVendor.do",method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> updateVendor(@RequestBody Map<String,VendorBean> data){

		Map<String,	Object> jsonMap = new HashMap<String, Object>();
		Map<String, String> errorMap = new HashMap<String, String>();
		VendorBean viewVendorBean = null;
		VendorBean updatedVendorBean = null;
		if(data == null || data.size() < 2 ){
			putAllVendorBeanError(errorMap);
			jsonMap.put("error", errorMap);
		} else{
			viewVendorBean = data.get("viewVendorBean");
			updatedVendorBean = data.get("updatedVendorBean");

			if (!validateVendorBean(updatedVendorBean, errorMap)) {
				jsonMap.put("error", errorMap);
			} else if (matchViewAndUpdatedVendorBean(viewVendorBean,updatedVendorBean)) {
				jsonMap.put("message", messageSource.getMessage("message.update.vendor", null, Locale.US));
			} else {
				if (!viewVendorBean.getVendorName().equalsIgnoreCase(updatedVendorBean.getVendorName())
						&& validateVendorNameInDb(updatedVendorBean)) {
					jsonMap.put("error", messageSource.getMessage("vendor.name.is.already.present.in.db", null, Locale.US));
				} else {
					Vendor vendor = VendorConverter.getEntityFromUIBean(updatedVendorBean);
					Item item = new Item();
					item.setItemName(updatedVendorBean.getItemName());
					if (updatedVendorBean.getItemId() == null) {
						item.setStatus("Active");
						itemService.saveItem(item);
					} else {
						item.setItemId(updatedVendorBean.getItemId());
					}
					vendor.getItems().add(item);
					vendorService.updateVendor(vendor);
					jsonMap.put("message", messageSource.getMessage("message.update.vendor", null, Locale.US));
				}

			}
		}
	return jsonMap;
}

public boolean matchViewAndUpdatedVendorBean(VendorBean viewVendorBean, VendorBean updateVendorBean){
	if(!viewVendorBean.getVendorName().equalsIgnoreCase(updateVendorBean.getVendorName())
			|| !viewVendorBean.getVendorAddress().equalsIgnoreCase(updateVendorBean.getVendorAddress())
			|| !viewVendorBean.getVendorContactNo().equalsIgnoreCase(updateVendorBean.getVendorContactNo())
			|| !viewVendorBean.getItemName().equalsIgnoreCase(updateVendorBean.getItemName())){
		return false;
	}
	return true;
}

@RequestMapping(value="/deleteVendor.do",method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> deleteVendor(@RequestBody VendorBean deletedVendorBean) {
		Map<String, Object> jsonMap = new HashMap<String, Object>();
		if (deletedVendorBean == null) {
			jsonMap.put("error", messageSource.getMessage("error.vendor.object.is.not.available", null, Locale.US));
		} else {
			Vendor vendor = VendorConverter.getEntityFromUIBean(deletedVendorBean);
			vendorService.delete(vendor);
			jsonMap.put("message", messageSource.getMessage("message.delete.vendor", null, Locale.US));
		}
		return jsonMap;
	}
}
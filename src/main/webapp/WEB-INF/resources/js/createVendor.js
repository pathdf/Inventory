var CreateVendor = {};

CreateVendor.ItemBean = function(itemId, itemName, status){
	this.itemId = itemId == undefined ? null : itemId;
	this.itemName = itemName == undefined ? null : itemName;
	this.status = status == undefined ? null : status;
}

CreateVendor.VendorBean = function(vendorName,vendorAddress,vendorContactNo,itemName,itemId){
	this.vendorName = vendorName == undefined?null:vendorName;
	this.vendorAddress = vendorAddress == undefined ? null : vendorAddress;
	this.vendorContactNo = vendorContactNo == undefined ? null : vendorContactNo;
	this.itemName = itemName == undefined ? null : itemName;
	this.itemId = itemId == undefined ? null : itemId;
}

CreateVendor.init = function(data) {
	Common.setCsrfToken(data.csrfToken);
	CreateVendor.bindUIActions();
}

CreateVendor.bindUIActions = function(){
	CreateVendor.bindItemNameInput();
	CreateVendor.bindSaveVendorButton();
}
CreateVendor.unBindUIActions = function(){
	$('#itemName').unbind();
	$('#save').unbind();
}
CreateVendor.bindItemNameInput = function(){
	var timeOut;
	var previousValue='';
	$('#itemName').on('keyup', function(event) {
		var _this = this;
		clearTimeout(timeOut);
				if (Common.StringUtils.isBlank(_this.value) || Common.isSpecialKey(event)
						|| previousValue == _this.value
						|| CreateVendor.matchItemListToItemName(_this)) {
					previousValue = _this.value;
					return;
				}
		previousValue = _this.value;
		timeOut = setTimeout(function(){
			var itemBean = new CreateVendor.ItemBean(null,_this.value,null);
			CreateVendor.getItemStatus(itemBean);
		},300);
	});
}
	
CreateVendor.matchItemListToItemName = function(_this){
	var options = null;
	options = $('#itemList option');
	if (!Common.isUndefinedORNull(options)) {
		for (var index = 0; index < options.length; index++) {
			if (_this.value.toUpperCase() === options[index].value.toUpperCase()) {
				return true;
			}
		}
	}
	return false;
}

CreateVendor.bindSaveVendorButton = function() {
	
	$('#save').click(function() {
		CreateVendor.clearErrorsDivs();
		var vendorName = $('#vendorName').val();
		var vendorAddress = $('#vendorAddress').val();
		var vendorContactNo = $('#vendorContactNo').val();
		var itemName = $('#itemName').val();
		var saveFlag = true;
		
		if(Common.StringUtils.isBlank(vendorName) || !Common.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(vendorName)){
			$('div #vendorNameError').find('small').text(headerLocalizedData['vendor.name.cannot.blank']);
			saveFlag = false;
		}
		if(Common.StringUtils.isBlank(vendorAddress) || !Common.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(vendorAddress)){
			$('div #vendorAddressError').find('small').text(headerLocalizedData['vendor.address.cannot.blank']);
			saveFlag = false;
		}
		if(Common.StringUtils.isBlank(vendorContactNo) || !Common.Constants.NUMERIC_REGEX.test(vendorContactNo)){
			$('div #vendorContactNoError').find('small').text(headerLocalizedData['vendor.contact.no.cannot.blank']);
			saveFlag = false;
		}
		if(Common.StringUtils.isBlank(itemName) || !Common.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(itemName)){
			$('div #itemNameError').find('small').text(headerLocalizedData['item.name.cannot.blank']);
			saveFlag = false;
		}
		
		if(saveFlag){
			var itemId=null;
			var options = null;
			options = $('#itemList option');
			if (!Common.isUndefinedORNull(options)) {
				for (var index = 0; index < options.length; index++) {
					if (itemName.toUpperCase() == options[index].value.toUpperCase()) {
						itemId = options[index].id;
					}
				}
			}
			var vendorBean = new CreateVendor.VendorBean(vendorName, vendorAddress, vendorContactNo, itemName, itemId);
			CreateVendor.saveVendorAjax(vendorBean);
		}
		
	});

}

CreateVendor.clearErrorsDivs = function(){
	$('div #vendorNameError').find('small').text('');
	$('div #vendorAddressError').find('small').text('');
	$('div #vendorContactNoError').find('small').text('');
	$('div #itemNameError').find('small').text('');
}

CreateVendor.saveVendorAjax = function(vendorBean){
	$.ajax({
		headers : {
			'Content-Type' : 'application/json',
			'X-CSRF-TOKEN' : Common.getCsrfToken()
		},
		type : 'POST',
		url : 'saveVendor.do',
		data : JSON.stringify(vendorBean),
		dataType : 'json',
		success : function(jsonMap) {
			//console.log('succesfully saved vendor');
			if(!Common.isUndefinedORNull(jsonMap)){
				if(!Common.isUndefinedORNull(jsonMap.message)){
					Common.alertPopup(headerLocalizedData['alert.popup.success.title'], headerLocalizedData['alert.popup.successfully.save.vendor.title'], headerLocalizedData['alert.popup.ok.btn'],true);
				}else if(jsonMap.error == headerLocalizedData['vendor.name.is.already.present.in.db']){
					$('div #vendorNameError').find('small').text(jsonMap.error);
				}else{
					for(jsonIndex in jsonMap.error){
						if(jsonIndex == 'vendorNameError'){
							$('div #vendorNameError').find('small').text(jsonMap.error[jsonIndex]);
						}else if(jsonIndex == 'vendorAddressError'){
							$('div #vendorAddressError').find('small').text(jsonMap.error[jsonIndex]);
						}else if(jsonIndex == 'vendorContactNoError'){
							$('div #vendorContactNoError').find('small').text(jsonMap.error[jsonIndex]);
						}else if(jsonIndex == 'itemNameError'){
							$('div #itemNameError').find('small').text(jsonMap.error[jsonIndex]);
						}
					}
				}
			}
		},		
		error : function(err) {
			Common.alertPopup(headerLocalizedData['alert.popup.warning.title'], headerLocalizedData['alert.popup.server.error'], headerLocalizedData['alert.popup.ok.btn'],true);
		}
	});
}


CreateVendor.getItemStatus = function(itemBean) {
	$.ajax({
		headers : {
			'Content-Type' : 'application/json',
			'X-CSRF-TOKEN' : Common.getCsrfToken()
		},
		type : 'POST',
		url : 'getItems.do',
		data : JSON.stringify(itemBean),
		dataType : 'json',
		beforeSend : function() {
			var itemList = document.getElementById('itemList');
			itemList.innerHTML = "";
			//Vendor.itemArray = new Array();
		},
		success : function(data) {
			var itemList = null;
			if (data != null && data.length > 0) {
				itemList = document.getElementById('itemList');
				data.forEach(function(item) {
					//Vendor.itemArray.push(item);
					var option = document.createElement('option');
					option.value = item.itemName;
					option.setAttribute('id', item.itemId);
					itemList.appendChild(option);
				});
			}
		},
		error : function(err) {
			Common.alertPopup(headerLocalizedData['alert.popup.warning.title'],
					headerLocalizedData['alert.popup.server.error'],
					headerLocalizedData['alert.popup.ok.btn'],
					false);
		}
	});
}

var Vendor = {};
Vendor.Constants = {
		ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX : /^[a-zA-Z0-9]+[\sa-zA-Z0-9\x21-\x24\x26-\x2F\x40\x5C\x60]*$/
//Special Character including [!@#$&*()-+"'.,/\`]
}
Vendor.item = {
	'itemId' : 0,
	'itemName' : '',
	'status' : 'Active'
}

Vendor.vendorBean = {
		vendorName : null,
		vendorAddress : null,
		vendorContactNo : null,
		itemName : null,
		itemId : null
}

Vendor.setVendorBean = function(vendorName,vendorAddress,vendorContactNo,itemName,itemId){
	this.vendorBean.vendorName = vendorName;
	this.vendorBean.vendorAddress = vendorAddress;
	this.vendorBean.vendorContactNo = vendorContactNo;
	this.vendorBean.itemName = itemName;
	this.vendorBean.itemId = itemId;
}

Vendor.itemArray = new Array();

Vendor.reInitializeItem = function() {
	this.item.itemId = 0;
	this.item.itemName = '';
	this.item.status = 'Active';
}
Vendor.csrfToken=null;

Vendor.setCsrfToken = function(csrfToken){
	this.csrfToken = csrfToken;
}

Vendor.getCsrfToken = function(){
	return this.csrfToken;
}

Vendor.init = function(data) {
	Vendor.setCsrfToken(data.csrfToken);
	Vendor.initializedItemNameInput();
	Vendor.initializedSaveVendorButton();
}

Vendor.initializedItemNameInput = function(){
	var timeOut;
	var previousValue='';
	$('#itemName').on('keyup', function(event) {
		var _this = this;
		clearTimeout(timeOut);
				if (_this.value === '' || Common.isSpecialKey(event)
						|| previousValue == _this.value
						|| Vendor.matchItemListToItemName(_this)) {
					return;
				}
		previousValue = _this.value;
		timeOut = setTimeout(function(){
			Vendor.reInitializeItem();
			Vendor.item.itemName = _this.value;
			Vendor.getItemStatus(Vendor.item);
		},300);
	});
}
	
Vendor.matchItemListToItemName = function(_this){
	var options = null;
	options = $('#itemList option');
	if (options != null) {
		for (var i = 0; i < options.length; i++) {
			if (_this.value === options[i].value) {
				return true;
			}
		}
	}
	return false;
}
Vendor.initializedSaveVendorButton = function() {
	$('#save').click(function() {
		$('div #vendorNameError').find('small').text('');
		$('div #vendorAddressError').find('small').text('');
		$('div #vendorContactNoError').find('small').text('');
		$('div #itemNameError').find('small').text('');
		var vendorName = $('#vendorName').val();
		var vendorAddress = $('#vendorAddress').val();
		var vendorContactNo = $('#vendorContactNo').val();
		var itemName = $('#itemName').val();
		var itemId = null;
		var saveFlag = true;
		
		if(vendorName=="" || !Vendor.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(vendorName)){
			$('div #vendorNameError').find('small').text(headerLocalizedData['vendor.name.cannot.blank']);
			saveFlag = false;
		}
		if(vendorAddress=="" || !Vendor.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(vendorAddress)){
			$('div #vendorAddressError').find('small').text(headerLocalizedData['vendor.address.cannot.blank']);
			saveFlag = false;
		}
		if(vendorContactNo=="" || !Vendor.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(vendorContactNo)){
			$('div #vendorContactNoError').find('small').text(headerLocalizedData['vendor.contact.no.cannot.blank']);
			saveFlag = false;
		}
		if(itemName=="" || !Vendor.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(itemName)){
			$('div #itemNameError').find('small').text(headerLocalizedData['item.name.cannot.blank']);
			saveFlag = false;
		}else if(Vendor.itemArray.length > 0){
			Vendor.itemArray.forEach(function(data){
				if(data.itemName === itemName){
					itemId = data.itemId;
					return;
				}
			});
		}
		if(saveFlag){
			Vendor.setVendorBean(vendorName, vendorAddress, vendorContactNo, itemName, itemId);
			Vendor.saveVendorAjax(Vendor.vendorBean);
		}
		
	});

}

Vendor.saveVendorAjax = function(data){
	$.ajax({
		headers : {
			'Content-Type' : 'application/json',
			'X-CSRF-TOKEN' : Vendor.getCsrfToken()
		},
		type : 'POST',
		url : 'saveVendor.do',
		data : JSON.stringify(data),
		dataType : 'json',
		success : function(data) {
			console.log('succesfully saved vendor');
		},
		error : function(err) {
			console.log("error:-");
			console.log(err);
		}
	});
}


Vendor.getItemStatus = function(item) {
	$.ajax({
		headers : {
			'Content-Type' : 'application/json',
			'X-CSRF-TOKEN' : Vendor.getCsrfToken()
		},
		type : 'POST',
		url : 'getItems.do',
		data : JSON.stringify(item),
		dataType : 'json',
		beforeSend : function() {
			var itemList = document.getElementById('itemList');
			itemList.innerHTML = "";
			Vendor.itemArray = new Array();
		},
		success : function(data) {
			var itemList = null;
			if (data != null && data.length > 0) {
				itemList = document.getElementById('itemList');
				data.forEach(function(item) {
					Vendor.itemArray.push(item);
					var option = document.createElement('option');
					option.value = item.itemName;
					itemList.appendChild(option);
				});
			}
		},
		error : function(err) {
			console.log("error:-");
			console.log(err);
		}
	});
}

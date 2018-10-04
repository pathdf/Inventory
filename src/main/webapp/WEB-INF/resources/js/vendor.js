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

Vendor.reInitializeItem = function() {
	this.item.itemId = 0;
	this.item.itemName = '';
	this.item.status = 'Active';
}

Vendor.init = function(data) {
	Vendor.initializedItemNameInput(data);
	Vendor.initializedSaveVendorButton();
}

Vendor.initializedItemNameInput = function(data){
	var timeOut;
	$('#itemName').on('keyup', function() {
		clearTimeout(timeOut);
		var _this = this;
		timeOut = setTimeout(function(){
			Vendor.reInitializeItem();
			Vendor.item.itemName = _this.value;
			Vendor.getItemStatus(Vendor.item, data.csrfToken);
		},300);
	});
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
		
		if(vendorName=="" || !Vendor.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(vendorName)){
			$('div #vendorNameError').find('small').text(headerLocalizedData['vendor.name.cannot.blank']);
		}
		if(vendorAddress=="" || !Vendor.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(vendorAddress)){
			$('div #vendorAddressError').find('small').text(headerLocalizedData['vendor.address.cannot.blank']);
		}
		if(vendorContactNo=="" || !Vendor.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(vendorContactNo)){
			$('div #vendorContactNoError').find('small').text(headerLocalizedData['vendor.contact.no.cannot.blank']);
		}
		if(itemName=="" || !Vendor.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(itemName)){
			$('div #itemNameError').find('small').text(headerLocalizedData['item.name.cannot.blank']);
		}
	});

}

Vendor.getItemStatus = function(item, csrfToken) {
	$.ajax({
		headers : {
			'Content-Type' : 'application/json',
			'X-CSRF-TOKEN' : csrfToken
		},
		type : 'POST',
		url : 'getItems.do',
		data : JSON.stringify(item),
		dataType : 'json',
		beforeSend : function() {
			var itemList = document.getElementById('itemList');
			itemList.innerHTML = "";
		},
		success : function(data) {
			var itemList = null;
			if (data != null) {
				itemList = document.getElementById('itemList');
				data.forEach(function(item) {
					var option = document.createElement('option');
					option.value = item.itemName;
					itemList.appendChild(option);
				});
			}
		},
		error : function(err) {
			console.log("error");
			console.log(err);
		}
	});
}

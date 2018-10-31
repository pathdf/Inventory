var ViewVendor = {};

ViewVendor.VendorBean = function(vendorId,vendorName,vendorAddress,vendorContactNo,itemName,itemId){
	this.vendorId = vendorId == undefined?null:vendorId;
	this.vendorName = vendorName == undefined?null:vendorName;
	this.vendorAddress = vendorAddress == undefined ? null : vendorAddress;
	this.vendorContactNo = vendorContactNo == undefined ? null : vendorContactNo;
	this.itemName = itemName == undefined ? null : itemName;
	this.itemId = itemId == undefined ? null : itemId;
}

ViewVendor.init = function(data){
	Common.init(data);
	ViewVendor.bindUIActions();
	Paging.init(data.pagingId, data.pageSizeId,data.records,ViewVendor.pagingCallBack)
}

ViewVendor.bindUIActions = function(){
	ViewVendor.bindEditButton();
	ViewVendor.bindDeleteButton();
}

ViewVendor.bindEditButton = function(){
	$('.edit-button-class').click(function(){
		ViewVendor.unBindPopupUIActions();
		ViewVendor.clearModal();
		var vendorBeanId = this.value;
		var vendorNameUiId = '#vendorName_'+vendorBeanId;
		var vendorAddressUiId = '#vendorAddress_'+vendorBeanId;
		var vendorContactNoUiId = '#vendorContactNo_'+vendorBeanId;
		var itemNameUiId = '#itemName_'+vendorBeanId;
		var itemIdUiId = '#itemId_'+vendorBeanId;
		$('#vendorName')[0].value = $(vendorNameUiId).text();
		$('#vendorAddress')[0].value = $(vendorAddressUiId).text();
		$('#vendorContactNo')[0].value = $(vendorContactNoUiId).text();
		$('#itemName')[0].value = $(itemNameUiId).text();
		$('#editPopupId').modal({
	        backdrop: 'static',
	        keyboard: true,
	        show : true
		});
		var viewVendorBean = new ViewVendor.VendorBean(vendorBeanId, $(
				vendorNameUiId).text(), $(vendorAddressUiId).text(), $(
				vendorContactNoUiId).text(), $(
				itemNameUiId).text(), $(itemIdUiId).val());
		ViewVendor.bindPopupUIActions(viewVendorBean);
	});
}

ViewVendor.bindDeleteButton = function(){
	$('.delete-button-class').click(function(){
		var vendorBeanId = this.value;
		var vendorNameUiId = '#vendorName_'+vendorBeanId;
		var vendorAddressUiId = '#vendorAddress_'+vendorBeanId;
		var vendorContactNoUiId = '#vendorContactNo_'+vendorBeanId;
		var itemNameUiId = '#itemName_'+vendorBeanId;
		var itemIdUiId = '#itemId_'+vendorBeanId;
		
		var deletedVendorBean = new ViewVendor.VendorBean(vendorBeanId,
				$(vendorNameUiId).text(),
				$(vendorAddressUiId).text(),
				$(vendorContactNoUiId).text(),
				$(itemNameUiId).text(),
				$(itemIdUiId).val());
		Common.confirmPopup(
				headerLocalizedData['alert.popup.warning.title'],
				headerLocalizedData['confirm.popup.delete.vendor.message'],
				headerLocalizedData['alert.popup.ok.btn'],
				headerLocalizedData['alert.popup.cancel.btn'],
				function(){
					ViewVendor.deleteVendorAjax(deletedVendorBean);
				},
				false);
	});
}
ViewVendor.deleteVendorAjax = function(data){
	$.ajax({
		headers : {
			'Content-Type' : 'application/json',
			'X-CSRF-TOKEN' : Common.getCsrfToken()
		},
		type : 'POST',
		url : 'deleteVendor.do',
		data : JSON.stringify(data),
		dataType : 'json',
		success : function(jsonMap) {
			//console.log('succesfully saved vendor');
			if(!Common.isUndefinedORNull(jsonMap)){
				if(!Common.isUndefinedORNull(jsonMap.message)){
					 Common.alertPopup(
							headerLocalizedData['alert.popup.success.title'],
							jsonMap.message,
							headerLocalizedData['alert.popup.ok.btn'],
							true);
				}else if(!Common.isUndefinedORNull(jsonMap.error)){
					Common.alertPopup(
							headerLocalizedData['alert.popup.warning.title'],
							jsonMap.error,
							headerLocalizedData['alert.popup.ok.btn'],
							false);
				}
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

ViewVendor.clearModal = function(){
	$('#vendorName')[0].value = '';
	$('#vendorAddress')[0].value = '';
	$('#vendorContactNo')[0].value = '';
	$('#itemName')[0].value = '';
	CreateVendor.clearErrorsDivs();
}

ViewVendor.bindPopupUIActions = function(viewVendorBean){
	CreateVendor.bindItemNameInput();
	ViewVendor.bindUpdatePopupButton(viewVendorBean);
	ViewVendor.bindToggleUpdateButton(viewVendorBean);
}

ViewVendor.unBindPopupUIActions = function(){
	$('#editPopupForm').unbind();
	$('#itemName').unbind();
	$('#editPopupUpdateButtonId').unbind();
}

ViewVendor.bindToggleUpdateButton = function(viewVendorBean){
	var updateButton = document.getElementById('editPopupUpdateButtonId');
	updateButton.setAttribute('disabled',true);
	$('#editPopupForm').on('input',':input',function(){
		var localVendorName = $('#vendorName').val();
		var localVendorAddress = $('#vendorAddress').val();
		var localVendorContactNo = $('#vendorContactNo').val();
		var localItemName = $('#itemName').val();
		var form = $('#editPopupForm');
		updateButton.setAttribute('disabled',true);
		if(form[0].elements[0].value.trim() != form[0].elements[0].defaultValue  && form[0].elements[0].value.trim().toUpperCase() != viewVendorBean.vendorName.trim().toUpperCase()){
			updateButton.removeAttribute('disabled');
		}
		if(form[0].elements[1].value.trim() != form[0].elements[1].defaultValue  && form[0].elements[1].value.trim().toUpperCase() != viewVendorBean.vendorAddress.trim().toUpperCase()){
			updateButton.removeAttribute('disabled');
		}
		if(form[0].elements[2].value.trim() != form[0].elements[2].defaultValue  && form[0].elements[2].value.trim().toUpperCase() != viewVendorBean.vendorContactNo.trim().toUpperCase()){
			updateButton.removeAttribute('disabled');
		}
		if(form[0].elements[3].value.trim() != form[0].elements[3].defaultValue  && form[0].elements[3].value.trim().toUpperCase() != viewVendorBean.itemName.trim().toUpperCase()){
			updateButton.removeAttribute('disabled');
		}
		
	});
}

ViewVendor.bindUpdatePopupButton = function(viewVendorBean) {
	
	$('#editPopupUpdateButtonId').click(function() {
		CreateVendor.clearErrorsDivs();
		var vendorName = $('#vendorName').val();
		var vendorAddress = $('#vendorAddress').val();
		var vendorContactNo = $('#vendorContactNo').val();
		var itemName = $('#itemName').val();
		var updateFlag = true;
		
		if(!Common.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(vendorName)){
			$('div #vendorNameError').find('small').text(headerLocalizedData['vendor.name.cannot.blank']);
			updateFlag = false;
		}
		if(!Common.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(vendorAddress)){
			$('div #vendorAddressError').find('small').text(headerLocalizedData['vendor.address.cannot.blank']);
			updateFlag = false;
		}
		if(!Common.Constants.NUMERIC_REGEX.test(vendorContactNo)){
			$('div #vendorContactNoError').find('small').text(headerLocalizedData['vendor.contact.no.cannot.blank']);
			updateFlag = false;
		}
		if(!Common.Constants.ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX.test(itemName)){
			$('div #itemNameError').find('small').text(headerLocalizedData['item.name.cannot.blank']);
			updateFlag = false;
		}
		
		if(updateFlag){
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
			
			if(!Common.isUndefined(viewVendorBean.itemName) && !Common.isUndefined(viewVendorBean.itemId)){
				var tempItemId = null;
				if(viewVendorBean.itemName != itemName){
					tempItemId = itemId;
				}else{
					tempItemId  = viewVendorBean.itemId;
				}
				var updatedVendorBean = new ViewVendor.VendorBean(viewVendorBean.vendorId,vendorName, vendorAddress, vendorContactNo, itemName, tempItemId);
				var data ={
						'viewVendorBean' : viewVendorBean,
						'updatedVendorBean' : updatedVendorBean
				}
				ViewVendor.updateVendorAjax(data);
			}
		}
		
	});

}

ViewVendor.updateVendorAjax = function(data){

	$.ajax({
		headers : {
			'Content-Type' : 'application/json',
			'X-CSRF-TOKEN' : Common.getCsrfToken()
		},
		type : 'POST',
		url : 'updateVendor.do',
		data : JSON.stringify(data),
		dataType : 'json',
		success : function(jsonMap) {
			//console.log('succesfully saved vendor');
			if(!Common.isUndefinedORNull(jsonMap)){
				if(!Common.isUndefinedORNull(jsonMap.message)){
					 $('#editPopupId').modal('toggle');
					 Common.alertPopup(
							headerLocalizedData['alert.popup.success.title'],
							jsonMap.message,
							headerLocalizedData['alert.popup.ok.btn'],
							true);
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
			$('#editPopupId').modal('toggle');
					Common.alertPopup(
							headerLocalizedData['alert.popup.warning.title'],
							headerLocalizedData['alert.popup.server.error'],
							headerLocalizedData['alert.popup.ok.btn'],
							false);
		}
	});

}

ViewVendor.pagingCallBack = function(from,pageSize){
	//window.location.href="/Inventory/viewVendor.do?from="+from+"&pageSize="+pageSize+"&_csrf="+Common.getCsrfToken();
	$.ajax({
		headers : {
			'Content-Type' : 'application/json',
			'X-CSRF-TOKEN' : Common.getCsrfToken()
		},
		type : 'GET',
		url : 'restrictedViewVendor.do?from='+from+'&pageSize='+pageSize,
		dataType : 'json',
		beforeSend : function(){
			$('#tableBodyId')[0].innerHTML="";
		},
		success : function(jsonMap){
			if(!Common.isUndefinedORNull(jsonMap)){
				var recordCount = (from/pageSize)*pageSize;
				var tableRow="";
				for(var index = 0; index < jsonMap.length; index++){
					tableRow+="<tr>";
					tableRow+="<td id='"+"vendorId_"+jsonMap[index].vendorId+"'>"+(++recordCount)+"</td>";
					tableRow+="<td id='"+"vendorName_"+jsonMap[index].vendorId+"'>"+jsonMap[index].vendorName+"</td>";
					tableRow+="<td id='"+"vendorAddress_"+jsonMap[index].vendorId+"'>"+jsonMap[index].vendorAddress+"</td>";
					tableRow+="<td id='"+"vendorContactNo_"+jsonMap[index].vendorId+"'>"+jsonMap[index].vendorContactNo+"</td>";
					tableRow+="<td id='"+"itemName_"+jsonMap[index].vendorId+"'>"+jsonMap[index].itemName+"</td>";
					tableRow+="<input type='hidden' id='"+"itemId_"+jsonMap[index].vendorId+"' value='"+jsonMap[index].itemId+"'>";
					tableRow+="<td>";
					tableRow+="<button value='"+jsonMap[index].vendorId+"'"+"type='button' class='btn btn-primary btn-xs edit-button-class'>"+headerLocalizedData['edit.button.label']+"</button>";
					tableRow+=" ";
					tableRow+="<button value='"+jsonMap[index].vendorId+"'"+"type='button' class='btn btn-danger btn-xs delete-button-class'>"+headerLocalizedData['delete.button.label']+"</button>";
					tableRow+="</td>";
					tableRow+="</tr>";
					
				}
				$('#tableBodyId')[0].innerHTML=tableRow;
				ViewVendor.bindUIActions();
			}
		}
	});
}
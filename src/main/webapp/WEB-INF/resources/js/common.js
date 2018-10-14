var Common = {};

Common.StringUtils = {};

Common.Constants = {
		ALPHA_NUMERIC_SPECIAL_CHARACTER_REGEX : /^[a-zA-Z0-9]+[\sa-zA-Z0-9\x21-\x24\x26-\x2F\x40\x5C\x60]*$/, //Special Character including [!@#$&*()-+"'.,/\`]
		NUMERIC_REGEX : /^[0-9]+$/

}

Common.isSpecialKey = function(event) {
	switch (event.keyCode) {
	case 9:
	case 13:
	case 16:
	case 17:
	case 18:
	case 19:
	case 20:
	case 27:
	case 33:
	case 34:
	case 35:
	case 36:
	case 37:
	case 38:
	case 39:
	case 40:
	case 45:
	case 91:
	case 92:
	case 93:
	case 112:
	case 113:
	case 114:
	case 115:
	case 116:
	case 117:
	case 118:
	case 119:
	case 120:
	case 121:
	case 122:
	case 123:
	case 144:
	case 145:
		return true;
	default:
		return false;
	}
}

Common.csrfToken = null;


Common.setCsrfToken = function(csrfToken){
	this.csrfToken = csrfToken;
}

Common.getCsrfToken = function(){
	return this.csrfToken;
}

Common.init = function(data){
	Common.setCsrfToken(data.csrfToken);
}

Common.bindUIActions = function(){
	
}


Common.isUndefinedORNull = function(data){
	if(data == undefined || data == null){
		return true;
	}
	return false;
}

Common.isUndefined = function(data){
	if(data == undefined){
		return true;
	}
	return false;
}

Common.isNull = function(data){
	if(data == null){
		return true;
	}
	return false;
}

Common.StringUtils.isBlank = function(str){
	if(str == undefined || str == null || Common.StringUtils.hasBlankSpaces(str)){
		return true;
	}
	return false;
}

Common.StringUtils.hasBlankSpaces = function(str){
	if(str.trim() == ""){
		return true;
	}
	return false;
}


Common.alertPopup = function(header,body,ok,refresh){
	if(header){
		$('#alertTitle').text(header);
	}
	if(body){
		$('#alertMessage').text(body);
	}
	if(ok){
		$('#alertOkButton').text(ok);
	}else{
		$('#alertOkButton').text(headerLocalizedData['alert.popup.ok.btn']);
	}
	$('#alertPopup').modal({
        backdrop: 'static',
        keyboard: true,
        show : true
	});
	$('#alertOkButton').click(function(){
		if(refresh){
			window.location.reload(refresh);
		}
		this.undbind("click");
	});
}

Common.confirmPopup = function(header,body,ok,cancel,callback,refresh){
	if(header){
		$('#confirmTitle').text(header);
	}
	if(body){
		$('#confirmMessage').text(body);
	}
	if(ok){
		$('#confirmOkButton').text(ok);
	}else{
		$('#confirmOkButton').text(headerLocalizedData['alert.popup.ok.btn']);
	}
	if(cancel){
		$('#confirmCancelButton').text(cancel);
	}else{
		$('#confirmCancelButton').text(headerLocalizedData['alert.popup.cancel.btn']);
	}
	$('#confirmPopup').modal({
        backdrop: 'static',
        keyboard: true,
        show : true
	});
	$('#confirmOkButton').click(function(){
		if(callback){
			callback();
		}
		this.undbind("click");
	});
}
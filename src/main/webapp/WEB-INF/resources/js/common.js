var Common = {};

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

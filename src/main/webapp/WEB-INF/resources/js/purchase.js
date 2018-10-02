var purchase ={};
purchase.item ={
		'itemId' : 0,
		'itemName':'',
		'status':'Active'
}

purchase.reInitializeItem = function(){
	this.item.itemId = 0;
	this.item.itemName = '';
	this.item.status = 'Active';
}

purchase.init = function(data){
	$('#itemName').keypress(function(){
		purchase.reInitializeItem();
		purchase.item.itemName = this.value;
		purchase.getItemStatus(purchase.item, data.csrfToken);
	});
}


purchase.getItemStatus = function(item,csrfToken){
	$.ajax({
				headers: { 
			        'Content-Type': 'application/json',
			        'X-CSRF-TOKEN' : csrfToken
			    },
				type : 'POST',
				url : 'getItems.do',
				data : JSON.stringify(item),
				dataType : 'json',
				beforeSend : function(){
					var itemList = document.getElementById('itemList');
					itemList.innerHTML = "";
				},
				success : function(data){
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
				error : function(err){
					console.log("error");
					console.log(err);
				}
	});
}

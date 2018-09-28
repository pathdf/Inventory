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

purchase.init = function(){
	$('#itemName').change(function(){
		purchase.reInitializeItem();
		purchase.item.itemName = this.value;
		purchase.getItemStatus(purchase.item);
	});
}


purchase.getItemStatus = function(item){
	$.ajax({
				headers: { 
			        'Content-Type': 'application/json',
			        'X-CSRF-TOKEN' : $('#x_csrf_id').val()
			    },
				type : 'POST',
				url : 'getItemStatus.do',
				data : JSON.stringify(item),
				dataType : 'json',
				beforeSend : function(){
					console.log("beforeSend");
					console.log(item);
				},
				success : function(data){
					console.log(data);
					console.log('success');
				},
				error : function(err){
					console.log("error");
					console.log(err);
				},
				complete : function(){
					console.log("complete");
				}
				
				
				
	});
}


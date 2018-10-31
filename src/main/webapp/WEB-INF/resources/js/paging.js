var Paging = {};
Paging.Constants = {
    pageSize : 20,
    pageNum : 0,
    totalPage : 1,
    records : 0
}

Paging.Settings = {
    pagingContainerId : '#pagingId',
    pageSizeContainerId : '#pageSizeId',
    max : 10,
    min : 1,
    mid : 6,
    callback : undefined
}


    Paging.init = function(pagingContainerId,pagiSizeContainerId,records,callback){
		this.Settings.max = 10;
		this.Settings.min = 1;
    if(records){
        this.Settings.pagingContainerId = pagingContainerId;
        this.Constants.records = records;
        this.Constants.totalPage = Math.ceil(records/this.Constants.pageSize);
        this.Settings.max = this.Constants.totalPage > this.Settings.max ? this.Settings.max : this.Constants.totalPage;
        this.Settings.min = this.Constants.totalPage > 0 ? 1 : 0;
        this.Settings.callback = callback;
        if(this.Settings.min > 0){
            this.displayPaging(1);
            this.displayPageSize();
        }else{
        	this.hidePageSize();
        }
    }
}

Paging.setPageSize = function(pageSize){
    this.Constants.pageSize  = pageSize;
    this.Settings.callback(0,this.Constants.pageSize);
    this.init(this.Settings.pagingContainerId, this.Settings.pageSizeContainerId, this.Constants.records, this.Settings.callback);
}

Paging.goPrevious = function(){
    this.Constants.pageNum--;
    this.goPage(this.Constants.pageNum);
}

Paging.goNext = function(){
    this.Constants.pageNum++;
    this.goPage(this.Constants.pageNum);
}

Paging.displayPageSize = function(){
	this.bindingPageSize();
}

Paging.hidePageSize = function(){
	$(this.Settings.pageSizeContainerId).hide();
}

Paging.bindingPageSize = function(){
	$(this.Settings.pageSizeContainerId+' ul li:not(:first)').click(function(){
		$(Paging.Settings.pageSizeContainerId+' ul li').removeClass('selected');
		$(this).addClass('selected');
		Paging.unBindPageSize();
		Paging.setPageSize(this.textContent);
		
	});
}

Paging.unBindPageSize = function(){
	$(this.Settings.pageSizeContainerId+' ul li').unbind();
}
Paging.displayPaging = function(activePageNo){
    this.Constants.pageNum = activePageNo;
    $(this.Settings.pagingContainerId)[0].innerHTML ="";
    for(var pageNo = this.Settings.min; pageNo <= this.Settings.max ; pageNo++){
        if(activePageNo == pageNo){
            $(this.Settings.pagingContainerId)[0].innerHTML +="<li class='selected'><a href="+"'javascript:void(0)"+"'>"+pageNo+"</a></li>";
        }else{
            $(this.Settings.pagingContainerId)[0].innerHTML +="<li><a href="+"'javascript:Paging.goPage("+pageNo+")'>"+pageNo+"</a></li>";
        }
    }
    if(this.Constants.pageNum > 1){
        $(this.Settings.pagingContainerId +' li:first').before("<li><a href="+"'javascript:Paging.goPrevious()'><i class=\" glyphicon glyphicon-triangle-left\"></i>"+"Previous"+"</a></li>");
    }else{
        $(this.Settings.pagingContainerId +' li:first').before("<li class='disabled'><a href="+"'javascript:void(0)'><i class=\"glyphicon glyphicon-triangle-left\"></i>"+"Previous"+"</a></li>");
    }
    if(this.Constants.pageNum < this.Constants.totalPage){
        $(this.Settings.pagingContainerId +' li:last').after("<li><a href="+"'javascript:Paging.goNext()'>"+"Next"+"<i class=\"glyphicon glyphicon-triangle-right\"></i></a></li>");
    }else{
        $(this.Settings.pagingContainerId +' li:last').after("<li class='disabled'><a href="+"'javascript:void(0)'>"+"Next"+"<i class=\"glyphicon glyphicon-triangle-right\"></i></a></li>");
    }
}

Paging.goPage = function(selectedPage){
     if( this.Settings.max > 9 && selectedPage + this.Settings.mid == this.Settings.max + this.Settings.mid){
         if(this.Constants.totalPage - selectedPage > this.Settings.max - this.Settings.mid){
            this.Settings.min = this.Settings.mid;
            this.Settings.mid = this.Settings.max + 1;
            this.Settings.max = this.Settings.max + this.Settings.max - this.Settings.min + 1;
         }else{
            this.Settings.min += this.Constants.totalPage - selectedPage;
            this.Settings.mid += this.Constants.totalPage - selectedPage;
            this.Settings.max += this.Constants.totalPage - selectedPage;
         }
     }else if(this.Settings.max > 9 && this.Settings.mid - selectedPage == this.Settings.mid - this.Settings.min){
         if(selectedPage > this.Settings.mid - this.Settings.min){
             this.Settings.max = this.Settings.mid - 1;
             this.Settings.mid = this.Settings.min;
             this.Settings.min = 2 * this.Settings.min - this.Settings.max - 1;
         }else{
             this.Settings.max -= selectedPage - 1;
             this.Settings.mid -= selectedPage - 1;
             this.Settings.min -= selectedPage - 1;
         }
     }
     this.Settings.callback(((selectedPage-1)*this.Constants.pageSize),this.Constants.pageSize);
     this.displayPaging(selectedPage);
}
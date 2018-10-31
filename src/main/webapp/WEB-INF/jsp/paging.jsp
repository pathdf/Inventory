<script type="text/javascript" src="resources/js/paging.js"></script>
<link rel='stylesheet' href='resources/css/paging.css'>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<div class="row paging-row">
	<div class="col-sm-6" id="pageSizeId">
	    
		<ul class="page-list" >
			<li class="no-border"><spring:message code='page.size.label' /></li>
			<li class="selected"><a href="javascript:void(0);"><spring:message code='page.size.twenty' /></a></li>
			<li><a href="javascript:void(0);"><spring:message code='page.size.fifty' /></a></li>
			<li><a href="javascript:void(0);"><spring:message code='page.size.hundred' /></a></li>
		</ul>
	</div>
	<div class="col-sm-6 text-right pull-right">
		<ul id="pagingId" class="page-list"></ul>
	</div>
</div>

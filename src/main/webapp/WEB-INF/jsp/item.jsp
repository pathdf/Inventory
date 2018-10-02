<%@taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<title>Home</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type='text/javascript'
	src="resources/plugin/jquery/js/jquery-3.3.1.min.js"></script>
<script type='text/javascript'
	src="resources/plugin/bootstrap/js/bootstrap.min.js"></script>
<link rel='stylesheet'
	href='resources/plugin/bootstrap/css/bootstrap.min.css'>

<script src="resources/js/purchase.js"></script>
<link rel="stylesheet" href="resources/css/footer.css">
</head>
<body>
	<jsp:include page="./header.jsp" />
	<div class="container">
		<form class="form-horizontal" action="#">
			<div class="form-group">
				<label class="col-sm-2 control-label">Vendor Name</label>
				<div class="col-sm-4"></div>
				<label class="col-sm-2 control-label">Vendor Address</label>
			</div>
			<div class="form-group">
				<div class="col-sm-2">
					<input class="form-control" id="vendorName" name="vendorName"
						type="text">
				</div>
				<div class="col-sm-4"></div>
				<div class="col-sm-2">
					<input class="form-control" id="vendorAddress" name="vendorAddress"
						type="text">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 control-label">Vendor Contact No.</label>
				<div class="col-sm-4"></div>
				<label class="col-sm-2 control-label">Item Name</label>
			</div>
			<div class="form-group">
				<div class="col-sm-2">
					<input class="form-control" id="vendorContactNo"
						name="vendorContactNo" type="text">
				</div>
				<div class="col-sm-4"></div>
				<div class="col-sm-2">
					<input class="form-control" id="itemName" name="itemName"
						type="text" list="itemList">
					<datalist id="itemList"></datalist>
				</div>
			</div>
			<input id="x_csrf_id" type="hidden" name="${_csrf.parameterName}"
				value="${_csrf.token}" />
		</form>
	</div>

	<jsp:include page="./footer.jsp" />
	<script>
$(document).ready(function(){
	var _csrfToken = "${_csrf.token}";
	var data ={
			csrfToken : _csrfToken
	}
	
	purchase.init(data);
});

</script>
</body>

</html>
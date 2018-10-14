<%@taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@page session="true"%>
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
<jsp:include page="./headerLocalizedData.jsp" />
<script src="resources/js/common.js"></script>
<script src="resources/js/createVendor.js"></script>
<link rel="stylesheet" href="resources/css/header.css">
<link rel="stylesheet" href="resources/css/vendor.css">
<link rel="stylesheet" href="resources/css/footer.css">
</head>
<body>
	<jsp:include page="./common.jsp"></jsp:include>
	<jsp:include page="./header.jsp" />
	<div class="container">
		<form autocomplete="off" class="form-horizontal" action="javascript:void(0)">
			<div class="form-group">
				<label class="col-sm-2 control-label"><spring:message code="vendor.name.label"></spring:message></label>
				<div class="col-sm-4">
					<input class="form-control" id="vendorName" name="vendorName"
						type="text">
				</div>
				<!-- <div class="col-sm-4"></div>
				 -->
			<div class="row" id="vendorNameError">
							<small class="text-danger pull-right col-sm-10 padding-left-of-error-msg"></small>
						</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 control-label"><spring:message code="vendor.address.label"></spring:message></label>
				<div class="col-sm-4">
					<input class="form-control" id="vendorAddress" name="vendorAddress"
						type="text">
				</div>
			<div class="row" id="vendorAddressError">
							<small class="text-danger pull-right col-sm-10 padding-left-of-error-msg"></small>
						</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 control-label"><spring:message code="vendor.contact.no.label"></spring:message></label>
				<div class="col-sm-4">
					<input class="form-control" id="vendorContactNo"
						name="vendorContactNo" type="text">
				</div>

			<div class="row" id="vendorContactNoError">
							<small class="text-danger pull-right col-sm-10 padding-left-of-error-msg"></small>
						</div>
			</div>
			<div class="form-group">

				<label class="col-sm-2 control-label"><spring:message code="item.name.label"></spring:message></label>
				<div class="col-sm-4">
					<input class="form-control" id="itemName" name="itemName"
						type="text" list="itemList">
					<datalist id="itemList"></datalist>
				</div>
			<div class="row" id="itemNameError">
							<small class="text-danger pull-right col-sm-10 padding-left-of-error-msg"></small>
						</div>
			</div>
			<button id="save" type="submit" class="btn btn-default center-block"><spring:message code="save.button.label"></spring:message></button>
		</form>
	</div>

	<jsp:include page="./footer.jsp" />
	<script>
		$(document).ready(function() {
			var _csrfToken = "${_csrf.token}";
			var data = {
				csrfToken : _csrfToken
			}
			CreateVendor.init(data);
		});
	</script>
</body>

</html>
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
<script src="resources/js/viewVendor.js"></script>
<link rel="stylesheet" href="resources/css/header.css">
<link rel="stylesheet" href="resources/css/footer.css">
</head>
<body>
	<jsp:include page="./common.jsp" />
	<jsp:include page="./header.jsp" />
	<div class="modal fade" id="editPopupId" role="dialog" tabindex='-1'>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 id="alertTitle"class="modal-title"></h4>
        </div>
        <div class="modal-body">
          <form id="editPopupForm" autocomplete="off" class="form-horizontal" action="javascript:void(0)">
			<div class="form-group">
				<label class="col-sm-4 control-label"><spring:message code="vendor.name.label"></spring:message></label>
				<div class="col-sm-6">
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
				<label class="col-sm-4 control-label"><spring:message code="vendor.address.label"></spring:message></label>
				<div class="col-sm-6">
					<input class="form-control" id="vendorAddress" name="vendorAddress"
						type="text">
				</div>
			<div class="row" id="vendorAddressError">
							<small class="text-danger pull-right col-sm-10 padding-left-of-error-msg"></small>
						</div>
			</div>
			<div class="form-group">
				<label class="col-sm-4 control-label"><spring:message code="vendor.contact.no.label"></spring:message></label>
				<div class="col-sm-6">
					<input class="form-control" id="vendorContactNo"
						name="vendorContactNo" type="text">
				</div>

			<div class="row" id="vendorContactNoError">
							<small class="text-danger pull-right col-sm-10 padding-left-of-error-msg"></small>
						</div>
			</div>
			<div class="form-group">

				<label class="col-sm-4 control-label"><spring:message code="item.name.label"></spring:message></label>
				<div class="col-sm-6">
					<input class="form-control" id="itemName" name="itemName"
						type="text" list="itemList">
					<datalist id="itemList"></datalist>
				</div>
			<div class="row" id="itemNameError">
							<small class="text-danger pull-right col-sm-10 padding-left-of-error-msg"></small>
						</div>
			</div>
			<%-- <button id="save" type="submit" class="btn btn-default center-block"><spring:message code="save.button.label"></spring:message></button> --%>
		</form>

        </div>
        <div class="modal-footer">
          <button id="editPopupUpdateButtonId" type="button" class="btn btn-default">Update</button><!--we are using save id because we are calling createVendor.js  -->
          <button id="editPopupCancelButtonId" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
	<div class="container">
		<div class="table-responsive">
			<table class="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Vendor Name</th>
						<th>Vendor Address</th>
						<th>Vednor Contact No.</th>
						<th>Item Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
				<c:forEach var="vendorBean" items="${vendorBeans}">
				     <c:forEach var="itemBean" items="${vendorBean.itemBeans}">
							<tr>
								<td id="vendorId_${vendorBean.vendorId}">${vendorBean.vendorId}</td>
								<td id="vendorName_${vendorBean.vendorId}">${vendorBean.vendorName}</td>
								<td id="vendorAddress_${vendorBean.vendorId}">${vendorBean.vendorAddress}</td>
								<td id="vendorContactNo_${vendorBean.vendorId}">${vendorBean.vendorContactNo}</td>
								<td id="itemName_${vendorBean.vendorId}">${itemBean.itemName}</td>
								<input type="hidden" id="itemId_${vendorBean.vendorId}" value="${itemBean.itemId}">
								<td>
								<button value="${vendorBean.vendorId}" type="button" class="btn btn-primary btn-xs edit-button-class">Edit</button>
								<button value="${vendorBean.vendorId}" type="button" class="btn btn-danger btn-xs delete-button-class">Delete</button>
								</td>
							</tr>
						</c:forEach>
				</c:forEach>
					
				</tbody>
			</table>
		</div>
	</div>

	<jsp:include page="./footer.jsp" />
	<script>
		$(document).ready(function() {
			var _csrfToken = "${_csrf.token}";
			var data = {
				csrfToken : _csrfToken
			}
			ViewVendor.init(data);
			
		});
	</script>
</body>

</html>
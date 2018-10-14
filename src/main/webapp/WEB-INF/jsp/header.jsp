<%@taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@page session="true"%>
<nav class="navbar navbar-inverse">
	<div class="container-fluid">
		<div class="navbar-header">
			<a class="navbar-brand" href="welcome"><spring:message code="header.navbar.inventory.label"></spring:message></a>
		</div>
		<ul class="nav navbar-nav">
			<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="welcome"><spring:message code="header.navbar.vendor.label"></spring:message><span class="caret"></a>
				<ul class="dropdown-menu">
					<li><a href="welcome">Add Vendor</a></li>
					<li><a href="viewVendor.do">Find Vendor</a></li>
				</ul>
			</li>
			<li><a href="welcome">Purchase</a></li>
		</ul>
		<sec:authorize access="hasAnyRole('User','Admin')">
			<!-- For login user -->
			<c:url value="/j_spring_security_logout" var="logoutUrl" />
			<form action="${logoutUrl}" method="post" id="logoutForm">
				<input type="hidden" name="${_csrf.parameterName}"
					value="${_csrf.token}" />
			</form>
			<script>
			function logoutFormSubmit() {
				document.getElementById("logoutForm").submit();
			}
		</script>

			<c:if test="${pageContext.request.userPrincipal.name != null}">
				<div class="navbar-header navbar-right">
					<a id="logoutId" class="navbar-brand"
						href="javascript:logoutFormSubmit()"><spring:message code="header.navbar.logout.label"></spring:message></a>
				</div>
			</c:if>

		</sec:authorize>

	</div>
</nav>


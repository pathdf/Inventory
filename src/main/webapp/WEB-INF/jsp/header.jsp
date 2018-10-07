<%@taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<nav class="navbar navbar-inverse">
	<div class="container-fluid">
		<div class="navbar-header">
			<a class="navbar-brand" href="welcome">Inventory</a>
		</div>
		<ul class="nav navbar-nav">
			<li class=""><a href="welcome">Home</a></li>
			<li><a href="welcome">Items</a></li>
			<li><a href="welcome">Vendors</a></li>
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
						href="javascript:logoutFormSubmit()">Logout</a>
				</div>
			</c:if>

		</sec:authorize>

	</div>
</nav>


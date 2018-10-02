<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@page session="true"%>
<html>
<head>
<script type='text/javascript' src="resources/plugin/jquery/js/jquery-3.3.1.min.js"></script>
<script type='text/javascript' src="resources/plugin/bootstrap/js/bootstrap.min.js"></script>
<link rel='stylesheet' href='resources/plugin/bootstrap/css/bootstrap.min.css'>
<link rel='stylesheet' href='resources/css/login.css'>
<!------ Include the above in your HEAD tag ---------->
<title><spring:message code="login.page.title"></spring:message></title>
</head>
<body>
	<section class="login-block">
	<div class="container">
		<div class="row">
			<div class="col-md-4 login-sec">
				<h2 class="text-center"><spring:message code="login.page.form.section.label"></spring:message></h2>
				<form name='loginForm' class="login-form" action="<c:url value='/auth/login_check?targetUrl=${targetUrl}' />" method="POST">
					<c:if test="${not empty error}">
						<div class="col-sm-12">
							<small class="text-danger center-block">${error}</small>
						</div>
					</c:if>
					
					<c:if test="${not empty msg}">
						<div class="col-sm-12">
							<small class="text-success center-block">${msg}</small>
						</div>
					</c:if>
					
					<div class="form-group">
						<label for="exampleInputEmail1" class="text-uppercase"><spring:message code="login.page.username.label"></spring:message></label>
						<input type="text" class="form-control" name="username"/>

					</div>
					<div class="form-group">
						<label for="exampleInputPassword1" class="text-uppercase"><spring:message code="login.page.password.label"></spring:message></label>
						<input type="password" class="form-control" name="password"/>
					</div>


					<div class="form-check">
						<c:if test="${empty loginUpdate}">
							<label class="form-check-label"> <input type="checkbox"
								class="form-check-input" name="remember-me"/> <small><spring:message code="login.page.remember.me.label"></spring:message></small>
							</label>
						</c:if>

						<button name="submit" type="submit" value="submit" class="btn btn-login float-right"><spring:message code="login.page.submit.button.label"></spring:message></button>
					</div>
					<input type="hidden" name="${_csrf.parameterName}"
						value="${_csrf.token}" />
				</form>
				<div class="copy-text">
					Created by <a
						href="http://paxcel.net/">paxcel.com</a>
				</div>
			</div>
			<div class="col-md-8 banner-sec">
				<div id="carouselExampleIndicators" class="carousel slide"
					data-ride="carousel">
					<ol class="carousel-indicators">
						<li class="item1 active"></li>
						<li class="item2"></li>
						<li class="item3"></li>
					</ol>
					<div class="carousel-inner" role="listbox">
						<div class="carousel-item active">
							<img class="d-block img-fluid"
								src="resources/images/pexels-photo.jpg" alt="First slide">
							<div class="carousel-caption d-none d-md-block">
								<div class="banner-text">
									<h2>This is Heaven</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
										sed do eiusmod tempor incididunt ut labore et dolore magna
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
								</div>
							</div>
						</div>
						<div class="carousel-item">
							<img class="d-block img-fluid"
								src="resources/images/people-coffee-tea-meeting.jpg"
								alt="First slide">
							<div class="carousel-caption d-none d-md-block">
								<div class="banner-text">
									<h2>This is Heaven</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
										sed do eiusmod tempor incididunt ut labore et dolore magna
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
								</div>
							</div>
						</div>
						<div class="carousel-item">
							<img class="d-block img-fluid"
								src="resources/images/pexels-photo-872957.jpeg"
								alt="First slide">
							<div class="carousel-caption d-none d-md-block">
								<div class="banner-text">
									<h2>This is Heaven</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
										sed do eiusmod tempor incididunt ut labore et dolore magna
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
	</section>

<jsp:include page="./footer.jsp"></jsp:include>	

</body>
</html>

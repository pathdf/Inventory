<%@taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
  <title>Home</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="resources/js/purchase.js"></script>
  <link rel="stylesheet" href="resources/css/footer.css">
</head>
<body>
 <jsp:include page="./header.jsp" />
	 <form action="/action_page.php">
  <div class="form-group">
    <label for="itemName"><spring:message code="item.name.label"></spring:message></label>
    <input type="text" class="form-control" id="itemName" name="itemName">
  </div>
  <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" class="form-control" id="pwd">
  </div>
  <div class="checkbox">
    <label><input type="checkbox"> Remember me</label>
  </div>
  <input id="x_csrf_id" type="hidden" name="${_csrf.parameterName}"
				value="${_csrf.token}" />
  <button type="submit" class="btn btn-default">Submit</button>
</form> 
<jsp:include page="./footer.jsp" />
<script>
$(document).ready(function(){
	purchase.init();
});

</script>
</body>

</html>
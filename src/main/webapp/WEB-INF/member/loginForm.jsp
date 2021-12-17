<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

<!-- css File -->
<link rel="stylesheet" href="css/loginForm.css">

<!-- kakao login -->
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

<title>회원 로그인</title>
</head>
<body>
<div class="login">
 <h1>로그인</h1>
  <form action="loginform" method="post">
   <div class="input-form">
    <label for="id">ID</label>
      <input type="text" id="id" placeholder="아이디 입력" required="required"><br>
   </div>
   <div class="input-form">
    <label for="pass">PW</label>
      <input type="password" id="pass" placeholder="비밀번호 입력" required="required"><br>
   </div>
   
    <span class="find">
	  <a href="findid">아이디 찾기</a>
	  <span class="or">|</span>
	  <a href="findpw">비밀번호 찾기</a>
    </span><br>
	    
    <span class="sign-up">회원이 아니신가요?&nbsp;&nbsp;<a href="gaipform" class="sign-up-link">Sign up</a></span>
    
    <button type="submit" class="login-btn">Login</button>
  </form>
  
  <!-- 카카오톡 로그인 -->
</div>
  
  <script src="js/loginForm.js"></script>
</body>
</html>
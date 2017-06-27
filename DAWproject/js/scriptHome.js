
$(document).ready(function(){
    $("#signUpButton").on('click', function() {
       window.location.href = "register.html";
     });
    
    $("#loginButton").on('click',login);
    
    cookie();
});


function login(){
    var rememberMe = $("#rememberMe").is(":checked");
    var jsonToSend ={
				"username" : $("#username").val(),
				"password" : $("#password").val(),
				"remember" : rememberMe,
				"accion" : "LOGIN"
        };
    $.ajax({
        url : "data/applicationLayer.php",
        type : "POST",
        data : jsonToSend,
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
        success : function(jsonReceived){
            window.location.replace("trailsHome.html");
        },
        error : function(errorMessage){
            alert(errorMessage.responseText);
        }
    });
}

function cookie(){
    
    var jsonCookie = {
        "accion" : "COOKIE"
        };
    
	$.ajax({
		url : "data/applicationLayer.php",
		type : "POST",
		data : jsonCookie,
		dataType : "json",

		success : function(cookieJson){
			$("#username").val(cookieJson.username);
		},
		error : function(errorMessage){
			console.log(errorMessage.responseText);
		}
	});
}





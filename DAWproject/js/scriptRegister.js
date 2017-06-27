
$(document).ready(function(){
    $("#registerButton").on('click', register);
});

function register(){
    if (validateRegister()){
        dbSubmit();
    }
    else{
        	alert("Datos incopletos");
    }
}
function validateRegister(){

	var validaciones = new Array();
	validaciones[0] = $("#first_name");
	validaciones[1] = $("#last_name");
	validaciones[2] = $("#username");
	validaciones[3] = $("#password");
	validaciones[4] = $("#email");
	validaciones[5] = $("#birthday");
    validaciones[6] = $("#country");
	var flag = true;

	for(var i = 0; i<validaciones.length; i++){
		if (validaciones[i].val() == ""){
			flag = false;
		}
	}
	return flag;
}

function clearRegister(){
	var validaciones = new Array();
	validaciones[0] = $("#first_name");
	validaciones[1] = $("#last_name");
	validaciones[2] = $("#username");
	validaciones[3] = $("#password");
	validaciones[4] = $("#email");
	validaciones[5] = $("#birthday");
    validaciones[6] = $("#country");

	for(var i = 0; i<validaciones.length; i++){
		validaciones[i].val("");
	}
}

function dbSubmit(){
	var newUserJson = {
            "first_name" : $("#first_name").val(),
            "last_name" : $("#last_name").val(),
            "username" : $("#username").val(),
            "password" : $("#password").val(),
            "email" : $("#email").val(),
            "birthday" : $("#birthday").val(),
            "country" : $("#country").val(),
            "accion" : "REGISTER"
        };
    
    $.ajax({
            type: "POST",
            url: "data/applicationLayer.php",
            data : newUserJson,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",

            success: function(jsonData) {
                clearRegister();
                window.location.replace("trailsHome.html");
            },
            error: function(errorMsg){
            	alert(errorMsg.responseText);
            }
        });
}



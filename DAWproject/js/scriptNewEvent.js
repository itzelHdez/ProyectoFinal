$(document).ready(function(){
    
    $("#registerButton1").on('click', newEvent); 
    $("#logout").on('click',logout);
    checkSession();
            
});

function newEvent(){
    if (validateNewEvent()){
        dbSubmitEvent();
    }
    else{
        	alert("Datos incopletos");
    }
}

function validateNewEvent(){

	var validaciones = new Array();
	validaciones[0] = $("#eventName");
	validaciones[1] = $("#eventCategory");
	validaciones[2] = $("#date");
	validaciones[3] = $("#hour");
	validaciones[4] = $("#maxUsers");
	validaciones[5] = $("#minUsers");
    validaciones[6] = $("#equipment");
    validaciones[7] = $("#description");
    validaciones[8] = $("#latitude");
    validaciones[9] = $("#longitude");
	var flag = true;

	for(var i = 0; i<validaciones.length; i++){
		if (validaciones[i].val() == ""){
			flag = false;
		}
	}
	return flag;
}

function clearNewEvent(){
	var validaciones = new Array();
	validaciones[0] = $("#eventName");
	validaciones[1] = $("#eventCategory");
	validaciones[2] = $("#date");
	validaciones[3] = $("#hour");
	validaciones[4] = $("#maxUsers");
	validaciones[5] = $("#minUsers");
    validaciones[6] = $("#equipment");
    validaciones[7] = $("#description");
    validaciones[8] = $("#latitude");
    validaciones[9] = $("#longitude");

	for(var i = 0; i<validaciones.length; i++){
		validaciones[i].val("");
	}
}

function dbSubmitEvent(){
	var newEventJson = {
            "eventName" : $("#eventName").val(),
            "eventCategory" : $("#eventCategory").val(),
            "date" : $("#date").val(),
            "hour" : $("#hour").val(),
            "maxUsers" : $("#maxUsers").val(),
            "minUsers" : $("#minUsers").val(),
            "equipment" : $("#equipment").val(),
            "description" : $("#description").val(),
            "latitude" : $("#latitude").val(),
            "longitude" : $("#longitude").val(),
            "accion" : "NEWEVENT"
        };
    
    $.ajax({
            type: "POST",
            url: "data/applicationLayer.php",
            data : newEventJson,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",

            success: function(jsonData) {
                clearNewEvent();
                window.location.href = "trailsHome.html";
            },
            error: function(errorMsg){
            	alert(errorMsg.responseText);
            }
        });
}

function logout()
{	
    var jsonToSend= {"accion" : "LOGOUT"};
	
	$.ajax({
		url: "data/applicationLayer.php",
		type: "POST",
		data: jsonToSend,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success : function(sessionJson){
			window.location.replace("home.html"); //aqui deberia estar el alert para mostrar el mensaje de success
		},
		error : function(errorMessage){
			window.location.replace("home.html"); //duda aqui, no deberia llevar tamien alert con el error message?
		}
	});
}

function checkSession()
{
	var jsonToSend= {"accion" : "SESSIONSERVICE"};
	
	$.ajax({
		url: "data/applicationLayer.php",
		type: "POST",
		data: jsonToSend,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function(sessionData){
			console.log("si entré sciptAboutUs");
		},
		error: function(errorMessage){
			alert(errorMessage.responseText);
			window.location.replace("home.html");
		}

	});
}
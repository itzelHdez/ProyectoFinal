
$(document).ready(function(){
    $("#comentButton").on('click', function() {
          window.location.href = "resenias.html";
        });
    
    $(".logout").on('click',logout);
    checkSession();
});

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

function checkSession(){
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





$(document).ready(function(){
    
    $("#logout").on('click',logout);
    checkSession();
    loadCookie();
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


function loadCookie()
{
    var jsonCookie = {
        "accion" : "COOKIE2"
        };
    
	$.ajax({
		url : "data/applicationLayer.php",
		type : "POST",
		data : jsonCookie,
		dataType : "json",

		success : function(cookieJson){
            var listComments="";
            $("#eventName").text(cookieJson.eventName);
            listComments=
                    '<p>Fecha: '+ cookieJson.eDate+'<br/>' +
                    'Hora: ' + cookieJson.eHour+'<br/>' +
                    'Equipo necesario: ' + cookieJson.equipment +'<br/>' +
                    'Descripcion: ' + cookieJson.description +'<br/></p><br>';
			 	$("#addInfoEvent").append(listComments);
            
		},
		error : function(errorMessage){
			console.log(errorMessage.responseText);
		}
	});

}

   




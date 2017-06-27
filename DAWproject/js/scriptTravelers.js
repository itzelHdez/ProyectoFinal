$(document).ready(function(){
    $(".logout").on('click',logout);
    checkSession();
    seeTravelers();
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

function seeTravelers(){
	
	var jsonToSend={"accion" : "TRAVELERSSERVICE"};

	$.ajax({
		url: "data/applicationLayer.php",
		type: "POST",
		data: jsonToSend,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded", 
		
		success:function(travelersData)
		{
			var listComments="";
			for(let traveler of travelersData){
			 	listComments='<p>'+'<b>' + traveler.fName + " " + traveler.lName + '</b>'+'<br>' +
                              "Contact me at: " + traveler.email + '<br>'+
                                traveler.country+'</p><br>';
			 	$("#addTravelers").append(listComments);
			}
		},
        
		error:function(errorMessage)
		{	
			//console.log("error seeComments");
			alert(errorMessage.responseText);
		}

	});

}
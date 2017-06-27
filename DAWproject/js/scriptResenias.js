$(document).ready(function(){
    $(".logout").on('click',logout);
    checkSession();
    $('.slider').slider();
    seeComments();
    $("#commentButton").on('click',addNewComment);
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

function seeComments(){
	
	var jsonToSend={"accion" : "COMMENTSSERVICE"};

	$.ajax({
		url: "data/applicationLayer.php",
		type: "POST",
		data: jsonToSend,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded", 
		
		success:function(commentsData)
		{
			var listComments="";
			for(let comment of commentsData){
			 	listComments='<p>Username: '+
			 				  comment.name+'<br/>'+
			 				  comment.ucomment+'<br/><br>'
			 				  '</p>';
			 	$("#addComment").append(listComments);
			}
		},
        
		error:function(errorMessage)
		{	
			//console.log("error seeComments");
			alert(errorMessage.responseText);
		}

	});

}


//-----------addnewComment---------------------------------------------
function addNewComment(){

	var jsonToSend= { 
					  'textarea': $("#textarea").val(),
					  'accion':"SAVECOMMENTSERVICE"
					};

	$.ajax({
		url: "data/applicationLayer.php",
		type: 'POST',
		data: jsonToSend,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",

		success:function(commentsD){
			var postcomment="";

			postcomment='<p>Username: '+
			 			 commentsD.username +'<br/>'+
			 		     $("#textarea").val()+'<br/><br>'
			 				  '</p>';
			$("#addComment").prepend(postcomment);
		
		},
		error:function(errorMessage){
			alert(errorMessage.responseText);
		}

	});

}
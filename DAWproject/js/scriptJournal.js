$(document).ready(function(){  
    $("#logout").on('click',logout);
    checkSession();
    seeEvents();
    $("#bla").on('click',function(){
        alert("blablabla");
    });
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
			$("#nameHeader").text(sessionData.fName + " " + sessionData.lName);
            $("#journalUsername").text(sessionData.username);
            $("#journalPais").text(sessionData.pais);
		},
		error: function(errorMessage){
			alert(errorMessage.responseText);
			window.location.replace("home.html");
		}

	});
}

function seeEvents()
{
	var jsonToSend={"accion" : "EVENTSSERVICE"};
    var newEvents = new Array();

	$.ajax({
		url: "data/applicationLayer.php",
		type: "POST",
		data: jsonToSend,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded", 
		
		success:function(eventsData)
		{   myFunction();
            var i=0;  
            for(let event of eventsData){
                newEvents[i]=event.eventName_e;
                console.log(newEvents[i]);
                i++;
            }
            console.log(newEvents.length);
            for (var i=0 ; i < newEvents.length; i++){
//               	listComments='<button class="myEvent" '+'id="'+ newEvents[i]+'">' + '</button><br/>';
//			 	$("#addEvents").append(listComments); 
                listComments='<button class="myEvent "'+'id="'+i+'">'+ newEvents[i] + '</button><br/>';
			 	$("#addEvents").append(listComments); 
                
//                listComments='<button class="myEvent">'+ newEvents[i] + '</button><br/>';
//			 	$("#addEvents").append(listComments);    
            }
             $(".myEvent").on("click",function(event){
                    var jsonToSend ={
                                    "eventName" : newEvents[event.target.id],
                                    "accion" : "SETCOOKIEEVENT"
                        };
                    $.ajax({
                        url : "data/applicationLayer.php",
                        type : "POST",
                        data : jsonToSend,
                        dataType : "json",
                        contentType : "application/x-www-form-urlencoded",
                        success : function(jsonReceived){
                            window.location.replace("infoActivity.html");
                        },
                        error : function(errorMessage){
                            alert(errorMessage.responseText);
                        }
                    });
            });   
         
         
         
/*			var listComments="";
			for(let event of eventsData){
			 	listComments='<button class="btn waves-effect waves-teal myEvent">'+ event.eventName_e + '</button><br/>';
			 	$("#addEvents").append(listComments);
			}*/
		},
        
		error:function(errorMessage)
		{	
			//console.log("error seeComments");
			alert(errorMessage.responseText);
		}

	});
}



function myFunction()
{
    newEvents= new Array();
}



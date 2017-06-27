
$(document).ready(function(){
    checkSession();
    $(".logout").on('click',logout);
    initMap();
    Marcador(25.647653, -100.288906);
    //marcadores();
});


function getMap()
{
    var map = new google.maps.Map(document.getElementById('trails'), {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: {lat: -34.397, lng: 150.644}  
    });
    return map;
}

function initMap() 
{
    map=getMap();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        map.setCenter(pos);
        });
    }
}

function Marcador(lati,longi){
    map = getMap();
    var content = '<div class="containerInfoMarker">' +
                    '<div class="titleInfoMarker">Event 1</div>' +
                    '<div class="contentInfoMarker">' +
                        '<div class="subTitleInfoMarker">Informacion</div><br>' +
                        '<img src="images/Journal_background3.jpg">' +
                        '<div>Bla bla bla bla bla bla</div>' +
                        '<div class="subTitleInfoMarker">Contacto</div>' +
                        '<p>e-mail: prueba@gmail.com</p>'+
                    '</div><br>' +
                    '<a href="infoActivity.html" class="buttonInfoMarker">DETAIL</a>'
                  '</div>' 
    ;

      var infowindow = new google.maps.InfoWindow({
          content: content
        });
        //marker.setMap(null); // oculta marcador
        //marker = null; //destruye el marcador
    
    pos2 = { lat: 0, lng: 0};
    pos2.lat = lati;
    pos2.lng = longi;
    
    var marker = new google.maps.Marker({
            icon: 'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/19554584_10211428139011277_640071051745298912_n.jpg?oh=249e8a9d0549862c8cc08245bee94ce1&oe=59C702FF',
            position: pos2
    });
    marker.setMap(map);
    
    marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
}

/*function marcadores(){
    var locations = [
        ['Bondi Beach', -33.890542, 151.274856, 4],
        ['Coogee Beach', -33.923036, 151.259052, 5],
        ['Cronulla Beach', -34.028249, 151.157507, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    var map = getMap();
    
    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}*/

    
   

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
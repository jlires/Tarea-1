function loadMap1() {
	L.mapbox.accessToken = 'pk.eyJ1IjoiamxpcmVzIiwiYSI6ImtBRGF4OWMifQ.PRJWq99Jh9amaB8DesBeOA';
	window.map = L.mapbox.map('map', 'jlires.li2in2gd');
	map.setView([0, 0], 2);

	
	var blueIcon = L.icon({
    	iconUrl: "blue-marker.png",
    	iconSize: [32, 32],
    	iconAnchor: [16, 16],
    	popupAnchor: [200, 100]
		});

	var customOptions =
        {
        'maxWidth': '500',
        'className' : 'custom'
        };


	var marker = [];
	$.getJSON("muestreo_usuarios.json", function(json) {
    	for (i = 0; i < 500; i++) {
    		var ubicacion = "http://maps.googleapis.com/maps/api/streetview?size=200x100&location=" + String(json.users[i].latitude) + ',' + String(json.users[i].longitude) + "&heading=151.78&pitch=-0.76&sensor=false";
    		var customPopup = "<br/><img src='"+ubicacion+"' alt='maptime logo gif' width='350px'/>" ;
    		marker[i] = L.marker([json.users[i].latitude, json.users[i].longitude], {icon: blueIcon}).bindPopup(customPopup,customOptions).addTo(map);
		}
	});


}




function loadMap2() {
	L.mapbox.accessToken = 'pk.eyJ1IjoiamxpcmVzIiwiYSI6ImtBRGF4OWMifQ.PRJWq99Jh9amaB8DesBeOA';
	window.map = L.mapbox.map('map', 'jlires.li2in2gd');
	map.setView([0,0], 2);
	window.markers = [];
	window.markers2 =[];
}

function form1() {
	var e = document.getElementById("usuarios");
	var check = jQuery("#checkbox").prop("checked");
	var usuario = parseInt(e.options[e.selectedIndex].value);

	var greenIcon = L.icon({
    	iconUrl: "green-marker.png",
    	iconSize: [32, 32],
    	iconAnchor: [16, 16],
    	popupAnchor: [200, 100]
		});

	var blueIcon = L.icon({
    	iconUrl: "blue-marker.png",
    	iconSize: [32, 32],
    	iconAnchor: [16, 16],
    	popupAnchor: [200, 100]
		});

	var customOptions =
        {
        'maxWidth': '500',
        'className' : 'custom'
        };

	for(i=0;i<markers.length;i++) {
    	map.removeLayer(markers[i]);
    }
   

	$.getJSON("input3.json", function(json) {
    	for (i = 0; i < json.usuarios[usuario]["check-ins"].length; i++) {
    		var ubicacion = "http://maps.googleapis.com/maps/api/streetview?size=200x100&location=" + String(json.usuarios[usuario]["check-ins"][i].latitude) + ',' + String(json.usuarios[usuario]["check-ins"][i].longitude) + "&heading=151.78&pitch=-0.76&sensor=false";
    		var customPopup = "<br/><img src='"+ubicacion+"' alt='maptime logo gif' width='350px'/>" ;
    		markers[i] = L.marker([json.usuarios[usuario]["check-ins"][i].latitude, json.usuarios[usuario]["check-ins"][i].longitude], {icon: blueIcon}).bindPopup(customPopup,customOptions).addTo(map);
		}
	});	


    if (check){
    	$.getJSON("input3.json", function(json) {
    	for (i = 0; i < json.usuarios[usuario]["amigos"].length; i++) {
    		for (j = 0; j < json.usuarios[usuario]["amigos"][i]["check-ins"].length; j++) {
    			var ubicacion = "http://maps.googleapis.com/maps/api/streetview?size=200x100&location=" + String(json.usuarios[usuario]["amigos"][i]["check-ins"][j].latitude) + ',' + String(json.usuarios[usuario]["amigos"][i]["check-ins"][j].longitude) + "&heading=151.78&pitch=-0.76&sensor=false";
    			var customPopup = "<br/><img src='"+ubicacion+"' alt='maptime logo gif' width='350px'/>" ;
    			markers.push(L.marker([json.usuarios[usuario]["amigos"][i]["check-ins"][j].latitude, json.usuarios[usuario]["amigos"][i]["check-ins"][j].longitude], {icon: greenIcon}).bindPopup(customPopup,customOptions).addTo(map));
    			}
			}

		})
	};

	
	

}

function form2() {
	alert("Aun no disponible, lo siento.");
}




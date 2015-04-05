function loadMap1() {
	L.mapbox.accessToken = 'pk.eyJ1IjoiamxpcmVzIiwiYSI6ImtBRGF4OWMifQ.PRJWq99Jh9amaB8DesBeOA';
	var map = L.mapbox.map('map', 'jlires.li2in2gd');
	map.setView([-33.452594, -70.658612], 10);

	map.attributionControl
    	.addAttribution('<a href="https://mapillary.com/">Images from Mapillary</a>');

	var API_ENDPOINT = 'https://api.mapillary.com/v1/im/search?' +
    	'min-lat=SOUTH&max-lat=NORTH&min-lon=WEST&max-lon=EAST&' +
    	'max-results=100&geojson=true';

	var images = L.mapbox.featureLayer()
    	.on('layeradd', function(e) {
        	e.layer.bindPopup('<img src="' + e.layer.feature.properties.image + '" />', {
            	minWidth: 340
        	});
    	})
    	.addTo(map);

	images.loadURL(API_ENDPOINT
    	.replace('SOUTH', map.getBounds().getSouth())
    	.replace('NORTH', map.getBounds().getNorth())
    	.replace('WEST', map.getBounds().getWest())
    	.replace('EAST', map.getBounds().getEast()));

	var marker = [];
	$.getJSON("muestreo_usuarios.json", function(json) {
    	for (i = 0; i < 500; i++) {
    		marker[i] = L.marker([json.users[i].latitude, json.users[i].longitude]).addTo(map);
		}
	});

	var cant_usuarios;
	var cant_locations;
	var cant_checkins;
	var amigos_por_usuario;
	var checkins_por_usuario;
	var checkins_por_location;
	$.getJSON("datos_usuarios.json", function(json) {
    	cant_usuarios = json.cant_usuarios;
    	cant_locations = json.cant_locations;
    	cant_checkins = json.cant_checkins;
    	amigos_por_usuario = json.amigos_por_usuario;
    	checkins_por_usuario = json.checkins_por_usuario;
    	checkins_por_location = json.checkins_por_location;
	});


}

function loadMap2() {
	L.mapbox.accessToken = 'pk.eyJ1IjoiamxpcmVzIiwiYSI6ImtBRGF4OWMifQ.PRJWq99Jh9amaB8DesBeOA';
	var map = L.mapbox.map('map', 'jlires.li2in2gd');
	map.setView([-33.4986752,-70.6098273], 15);
	var e = document.getElementById("usuarios");
	var usuario = parseInt(e.options[e.selectedIndex].value);
	var marker = [];
	$.getJSON("input3.json", function(json) {
    	for (i = 0; i < json.usuarios[usuario]["check-ins"].length; i++) {
    		marker[i] = L.marker([json.usuarios[usuario]["check-ins"][i].latitude, json.usuarios[usuario]["check-ins"][i].longitude]).addTo(map);
		}
	});
}

function form1() {
	
	

}

function form2() {
	alert("form2");
}




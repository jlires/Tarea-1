function loadMap1() {
	L.mapbox.accessToken = 'pk.eyJ1IjoiamxpcmVzIiwiYSI6ImtBRGF4OWMifQ.PRJWq99Jh9amaB8DesBeOA';
	window.map = L.mapbox.map('map', 'jlires.li2in2gd');
	map.setView([0, 0], 2);

	var blueIcon = L.icon({
    	iconUrl: "blue-marker.png",
    	iconSize: [32, 32],
    	iconAnchor: [16, 16],
    	popupAnchor: [0, 0]
		});

	var marker = [];
	$.getJSON("muestreo_usuarios.json", function(json) {
    	for (i = 0; i < 500; i++) {
    		marker[i] = L.marker([json.users[i].latitude, json.users[i].longitude]).addTo(map);
    		marker[i].setIcon(blueIcon);
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
	var usuario = parseInt(e.options[e.selectedIndex].value);
	var x=$("friends").is(":checked");
	alert(x)

	var greenIcon = L.icon({
    	iconUrl: "green-marker.png",
    	iconSize: [32, 32],
    	iconAnchor: [16, 16],
    	popupAnchor: [0, 0]
		});

	var blueIcon = L.icon({
    	iconUrl: "blue-marker.png",
    	iconSize: [32, 32],
    	iconAnchor: [16, 16],
    	popupAnchor: [0, 0]
		});

	for(i=0;i<markers.length;i++) {
    	map.removeLayer(markers[i]);
    }
   

	$.getJSON("input3.json", function(json) {
    	for (i = 0; i < json.usuarios[usuario]["check-ins"].length; i++) {
    		markers[i] = L.marker([json.usuarios[usuario]["check-ins"][i].latitude, json.usuarios[usuario]["check-ins"][i].longitude]).addTo(map);
    		markers[i].setIcon(blueIcon)
		}
	});	


    var length = markers.length

	$.getJSON("input3.json", function(json) {
    	for (i = 0; i < json.usuarios[usuario]["amigos"].length; i++) {
    		for (j = 0; j < json.usuarios[usuario]["amigos"][i]["check-ins"].length; j++) {
    			markers.push(L.marker([json.usuarios[usuario]["amigos"][i]["check-ins"][j].latitude, json.usuarios[usuario]["amigos"][i]["check-ins"][j].longitude]).addTo(map).setIcon(greenIcon));
    		}
		}

	});
	
	

}

function form2() {
	alert("form2");
}




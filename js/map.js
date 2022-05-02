"use strict";
class Marker{
	constructor(container, type) {
		this.container = container;
		this.type = type;
		
	}
	
}
function mapInit(){ //returns an object which is a map
	mapboxgl.accessToken = "pk.eyJ1Ijoic3VhYyIsImEiOiJjbDJudDdycXkxNjE1M2lxY3QyOTM3NHV3In0.KkzJGb4qqdkbDH0NequqPA";
	return new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [0, 0],
		zoom: 1
	});
}
function renderMarkers(markers){

}


let markers = [];
geojson.features.forEach(feature => {
    const element = document.createElement("div");
    element.className = "marker";
    markers[markers.length] = new mapboxgl.Marker(element).setLngLat(feature.geometry.coordinates).addTo(map);
});
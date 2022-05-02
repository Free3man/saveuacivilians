"use strict";
let mapboxgl;
class Map{
	constructor(container, style, center, zoom){
		this.container = container;
		this.style = style;
		this.center = center;
		this.zoom = zoom;
	}
	init(){
		mapboxgl.accessToken = "pk.eyJ1Ijoic3VhYyIsImEiOiJjbDJudDdycXkxNjE1M2lxY3QyOTM3NHV3In0.KkzJGb4qqdkbDH0NequqPA";
		this.map = new mapboxgl.Map({
			container: this.container,
			style: this.style,
			center: this.center,
			zoom: this.zoom
		});
	}
	static init(mapSettings){
		mapboxgl.accessToken = "pk.eyJ1Ijoic3VhYyIsImEiOiJjbDJudDdycXkxNjE1M2lxY3QyOTM3NHV3In0.KkzJGb4qqdkbDH0NequqPA";
		return new mapboxgl.Map({
			container: mapSettings.container,
			style: mapSettings.style,
			center: mapSettings.center,
			zoom: mapSettings.zoom
		});
	}
}
class Marker{
	constructor(container, type, feature) {
		this.container = container;
		this.type = type;
		this.feature = feature;
	}
	toJSON(){
		return JSON.stringify({
			contatiner: this.container,
			type: this.type,
			feature: this.feature
		});
	}
	static toJSON(marker){
		return JSON.stringify({
			contatiner: marker.container,
			type: marker.type,
			feature: marker.feature
		});
	}
	toObject(){
		return {
			contatiner: this.container,
			type: this.type,
			feature: this.feature
		};
	}
	static toObject(marker){
		return {
			contatiner: marker.container,
			type: marker.type,
			feature: marker.feature
		};
	}
	render(){
		markers[markers.length] = new mapboxgl.Marker(this.container)
		.setLngLat(this.feature.geometry.coordinates).addTo(map);
	}
}
function mapInit(){ //returns an object which is a map
	
}
function renderMarkers(markers){
	markers.forEach(marker =>{
		marker
	});
}


let markers = [];
geojson.features.forEach(feature => {
    const element = document.createElement("div");
    element.className = "marker";
    
});
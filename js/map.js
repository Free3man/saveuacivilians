"use strict";
const markerType = {
	basic: "basic",
	transport: "transport",
	military: "military"
};
const styles = {
	streets: "mapbox://styles/mapbox/streets-v11",
	light: "mapbox://styles/mapbox/light-v10",
};
let markers,
	// mapboxgl,
	mapBox,
	map;
function mapInit(container, style, center, zoom){
	mapboxgl.accessToken = "pk.eyJ1Ijoic3VhYyIsImEiOiJjbDJudDdycXkxNjE1M2lxY3QyOTM3NHV3In0.KkzJGb4qqdkbDH0NequqPA";
	map = new mapboxgl.Map({
		container: container,
		style: style,
		center: center,
		zoom: zoom
	});
}
function createMarker(){
	
}
// function getMarkers(){
// 	fetch("php/markers.php", {
// 		method: "POST",
// 		body: JSON.stringify({zero: 0})
// 	}).then((response)=>{
// 		if (response.ok && response.status == 200) {
// 			console.log(response.text());
// 		}
// 	}).then((answer)=>{
// 		markers = answer;
// 	}).catch(()=>{

// 	}).finally(()=>{

// 	});
// }
function toJSON(marker){
	return JSON.stringify({
		contatiner: marker.container,
		type: marker.type,
		feature: marker.feature
	});
}
function toObject(marker){
	return {
		contatiner: marker.container,
		type: marker.type,
		feature: marker.feature
	};
}
function render(){
	markers[markers.length()] = new mapboxgl.Marker(mapBox).setLngLat().addTo(map);
}
mapInit("map", styles.streets, [0,0], 0);
// getMarkers();
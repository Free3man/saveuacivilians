"use strict";
//thing that helms me not to became mad while typing cod but must be commented before lauching
// let mapboxgl;
//enums
const markerType = {
	basic: "basic",
	transport: "transport",
	military: "military"
},
styles = {
	streets: "mapbox://styles/mapbox/streets-v11",
	light: "mapbox://styles/mapbox/light-v10",
},
types = {
	geojson: "geojson",
	feature: "Feature",
	point: "Point"
};
//variables
let geojson = [],
markers = [],
map;
//functions
function toJSON(marker) {
	return JSON.stringify({
		contatiner: marker.container,
		type: marker.type,
		feature: marker.feature
	});
}
function toObject(marker) {
	return {
		contatiner: marker.container,
		type: marker.type,
		feature: marker.feature
	};
}
function convertIntoGeocoding(input){
	return `https://api.mapbox.com/geocoding/v5/mapbox.places/${input.replace(" ", "%20")}
	.json?access_token=pk.eyJ1Ijoic3VhYyIsImEiOiJjbDJudDdycXkxNjE1M2lxY3QyOTM3NHV3In0.KkzJGb4qqdkbDH0NequqPA`;
}
//API
function mapInit(container, style, center, zoom) {
	mapboxgl.accessToken = "pk.eyJ1Ijoic3VhYyIsImEiOiJjbDJudDdycXkxNjE1M2lxY3QyOTM3NHV3In0.KkzJGb4qqdkbDH0NequqPA";
	map = new mapboxgl.Map({
		container: container,
		style: style,
		center: center,
		zoom: zoom
	});
}
function createGeoJson(coordinates, title) {
	return {
		type: types.geojson,
		data: {
			type: types.feature,
			geometry: {
				type: types.point,
				coordinates: coordinates
			},
			properties: {
				title: title,
			}
		}
	};
}
function renderMarker(coordinates) {
	const element = document.createElement("div");
	element.className = "marker";
	markers[markers.length] = new mapboxgl.Marker(element).setLngLat(coordinates).addTo(map);
}
function searching(input){
	let data;
	fetch(convertIntoGeocoding(input), {
		method: "GET"
	}).then(responce => responce.json()
	).then(answer => {
		console.log(answer);
	}).catch(answer => console.log(answer));
	return data;
}
function getMarkers() {
	fetch("php/markers.php", {
		method: "POST",
		body: JSON.stringify({zero: 0})
	}).then((response)=>{
		if (response.ok && response.status == 200) {
			console.log(response.text());
		}
	}).then((answer)=>{
		markers = answer;
	}).catch(()=>{

	}).finally(()=>{

	});
}
//hiding bad things
window.addEventListener("load", ()=>{
	document.getElementsByClassName("mapboxgl-ctrl-bottom-right")[0].remove();
	document.getElementsByClassName("mapboxgl-ctrl-bottom-left")[0].remove();
});
//Mainflow
mapInit("map", styles.streets, [75, 50], 2);
// getMarkers();
console.log(searching("Dnipro"));
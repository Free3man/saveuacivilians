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
let geojson = [{
	type: types.geojson,
	data: {
		type: types.feature,
		geometry: {
			type: types.point,
			coordinates: [-77.0323, 38.9131]
		},
		properties: {
			title: "Mapbox DC",
			"marker-symbol": "monument"
		}
	}
},],
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
function createGeoJson() {
	
}
function renderMarker(geojson) {
	const element = document.createElement("div");
	element.className = "marker";
	markers[markers.length] = new mapboxgl.Marker(element).setLngLat(geojson.data.geometry.coordinates).addTo(map);
}


// function getMarkers() {
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
//
// 	}).finally(()=>{
//
// 	});
// }
window.addEventListener("load", ()=>{
	document.getElementsByClassName("mapboxgl-ctrl-bottom-right")[0].remove();
	document.getElementsByClassName("mapboxgl-ctrl-bottom-left")[0].remove();
});
//Mainflow
mapInit("map", styles.streets, [75, 50], 2);
// map.on('load', () => {
//     map.addLayer({
//         id: 'rpd_parks',
//         type: 'fill',
//         source: {
//             type: 'vector',
//             url: 'mapbox://mapbox.3o7ubwm8'
//         },
//         'source-layer': 'RPD_Parks',
//         layout: {
//             visibility: 'visible'
//         },
//         paint: {
//             'fill-color': 'rgba(61,153,80,0.55)'
//         }
//     });
// });
// getMarkers();
renderMarker(geojson[0]);
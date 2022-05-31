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
const accessToken = "pk.eyJ1Ijoic3VhYyIsImEiOiJjbDJudDdycXkxNjE1M2lxY3QyOTM3NHV3In0.KkzJGb4qqdkbDH0NequqPA",
defaultSearchSettings = {
	"language": "uk"
},
possibleKeys = ["bbox", "country","language", "limit"];
let geojsons = [],
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
function convertIntoGeocoding(search, searchSettings){
	let request = `${search.replace(" ", "%20")}.json?`;
	if (searchSettings.hasOwnProperty("limit")){
		if(searchSettings.limit>10){
			searchSettings.limit = 10;
		}
		if (searchSettings.limit<0){
			searchSettings.limit = 5;
		}
	}
	for (const key in searchSettings) {
		if (searchSettings.hasOwnProperty(key)){
			request += `${key}=${searchSettings[key]}&`;
		}
	}
	// for (const key in defaultSearchSettings) {
	// 	if (defaultSearchSettings.hasOwnProperty(key) && !searchSettings.hasOwnProperty(key)) {
	// 		request += `${key}=${defaultSearchSettings.key}&`;
	// 	}
	// }
	return `https://api.mapbox.com/geocoding/v5/mapbox.places/${request}access_token=${accessToken}`;
}
//API
function mapInit(container, style, center, zoom) {
	mapboxgl.accessToken = accessToken;
	map = new mapboxgl.Map({
		container: container,
		style: style,
		center: center,
		zoom: zoom
	});
}

function createGeoJson(coordinates, title) {
	const geojsonData = {
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
	geojsons[geojsons.length] = geojsonData;
	return geojsonData;
}

function renderMarker(coordinates) {
	const element = document.createElement("div");
	element.className = "marker";
	markers[markers.length] = new mapboxgl.Marker(element).setLngLat(coordinates).addTo(map);
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

async function searching(search, searchSettings){
	const responce = await fetch(convertIntoGeocoding(search, searchSettings), {
		method: "GET"
	});
	return responce.json();
}
//hiding bad things
window.addEventListener("load", ()=>{
	document.getElementsByClassName("mapboxgl-ctrl-bottom-right")[0].remove();
	document.getElementsByClassName("mapboxgl-ctrl-bottom-left")[0].remove();
});
document.addEventListener("DOMContentLoaded",  async () => {
	//Mainflow
	mapInit("map", styles.streets, [35, 47.5], 5);
});
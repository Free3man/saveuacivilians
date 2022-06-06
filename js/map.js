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
territoryRegions = {
	country: "country",
	region: "region",
	postcode: "postcode",
	district: "district",
	place: "place",
	locality: "locality",
	neighborhood: "neighborhood",
	address: "address",
	poi: "poi"
},
types = {
	geojson: "geojson",
	feature: "Feature",
	point: "Point"
};
//variables
const accessToken = "pk.eyJ1Ijoic3VhYyIsImEiOiJjbDJudDdycXkxNjE1M2lxY3QyOTM3NHV3In0.KkzJGb4qqdkbDH0NequqPA",
searchProperties = ["autocomplete", "bbox", "country", "fuzzyMatch", 
			"language", "limit", "proximity", "routing", "types", "worldview"],
defaultSearchSettings = {
	"language" : "uk"
};
let geojsons = [],
markers = [],
map;
//functions
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
		if (searchSettings.hasOwnProperty(key) && searchProperties.includes(key)){
			request += `${key}=${searchSettings[key]}&`;
		}
	}
	for (const key in defaultSearchSettings) {
		if (defaultSearchSettings.hasOwnProperty(key) && !searchSettings.hasOwnProperty(key) &&
																	searchProperties.includes(key)) {
			request += `${key}=${defaultSearchSettings[key]}&`;
		}
	}
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
function getCoordinatesFromGeojson(geojson){
	return geojson.data.geometry.coordinates;
}

function renderMarker(coordinates) {
	console.log(coordinates);
	const element = document.createElement("div");
	element.className = "marker";
	markers[markers.length] = new mapboxgl.Marker(element).setLngLat(coordinates).addTo(map);
}
async function getGeojsons() {
	const response =  await fetch("php/getGeojson.php", {method: "GET"});
	const answer = await response.then(answer => answer.json());
	answer.then(geojsons => {
		if(geojsons.hasOwnProperty('array')){
			geojsons.array.forEach(item => {
				item = JSON.parse(item);
				createGeoJson([+item.x, +item.y], item.title);
			});
		}
	});
}
async function saveGeoJson(geojson) {
	const temp = geojsons;
	temp.forEach(item => item = JSON.stringify({
		title: item.title,
		x: getCoordinatesFromGeojson(item)[0],
		y: getCoordinatesFromGeojson(item)[1],
	}));
	return await fetch("php/saveGeojson.php", {
		method:"POST",
		body: JSON.stringify({array: temp})
	}).then(response => response.json());
}

async function searching(search, searchSettings){
	const responce = await fetch(convertIntoGeocoding(search, searchSettings), {
		method: "GET"
	});
	return responce.json();
}
//hiding bad things
// window.addEventListener("load", ()=>{
// 	document.getElementsByClassName("mapboxgl-ctrl-bottom-right")[0].remove();
// 	document.getElementsByClassName("mapboxgl-ctrl-bottom-left")[0].remove();
// });
//place where you will be writing your code using my api
document.addEventListener("DOMContentLoaded",  async () => {
	//mainflow
	
});
"use strict";
// let mapboxgl;
class MarkerType{
	static get basic(){
		return "basic";
	}
	static get transport(){
		return "transport";
	}
	static get military(){
		return "military";
	}
}
class Feature{
	constructor(coordinates, title, description){
		this.coordinates = coordinates;
		this.title = title;
		this.description = description;
	}
	toObject(){
		return {
			type: "Feature",
			geometry: {
				type: 'Point',
				coordinates: this.coordinates 
			},
			properties:{
				title: this.title,
				description: this.description
			}
		};
	}
	static toObject(feature){
		return {
			type: "Feature",
			geometry: {
				type: 'Point',
				coordinates: feature.coordinates 
			},
			properties:{
				title: feature.title,
				description: feature.description
			}
		};
	}
}
class Marker{
	constructor(container, type, feature, map) {
		this.container = container;
		this.type = type;
		this.feature = feature;
		this.render(map);
		map.markers[map.markers.length()] = this;
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
	static toMarker(data, map){
		return new Marker(data.container, data.type, data.feature, map);
	}
	render(Map){
		Map.markers[this.id] = new mapboxgl.Marker(this.container)
		.setLngLat(this.feature.coordinates).addTo(Map.map);
		this.id = Map.map.markers.length();
	}
}
class Map{
	constructor(container, style, center, zoom){
		this.container = container;
		this.style = style;
		this.center = center;
		this.zoom = zoom;
		this.init();
	}
	get map(){
		return this.map;
	}
	get markers(){
		return this.markers;
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
	getMarkers(){
		fetch("php/map.php", {
			method: "GET",
		}).then((response)=>{
			if (response.ok && response.status == 200) {
				response.arrayBuffer();
			}
		}).then((answer)=>{
			answer.forEach(item => {
				Marker.toMarker(item, this);
			});
		}).catch(()=>{

		}).finally(()=>{

		});
	}
	getMap(){

	}
	setMarkers(){

	}
	setMap(){

	}
	static getMarkers(map){
		fetch("php/markers.php", {
			method: "GET",
		}).then((response)=>{
			if (response.ok && response.status == 200) {
				response.arrayBuffer();
			}
		}).then((answer)=>{
			answer.forEach(item => {
				Marker.toMarker(item, map);
			});
		}).catch(()=>{

		}).finally(()=>{

		});
	}
	static getMap(){

	}
	static setMarkers(){
		
	}
	static setMap(){

	}
}
//https://youtu.be/89gnG9ErOaA
let map = new Map(document.getElementById("map"), {}, [0,0], 1);
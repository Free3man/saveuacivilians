"use strict";
let mapboxgl;
/**
 * Summary. types of Markers
 * 
 * Description. enum filled with different types of Markers.
 * Is created to define a type of a marker not to do it with string literals.
 * Haw such a values as: 
 * * basic(will be shown with out any changes)
 * * transport(/enter what is the difference/)
 */
class MarkerType{
	get basic(){
		return "basic";
	}
	get transport(){
		return "transport";
	}
}
class Map{
	constructor(mapSettings){
		this.container = mapSettings.container;
		this.style = mapSettings.style;
		this.center = mapSettings.center;
		this.zoom = mapSettings.zoom;
	}
	get map(){
		return this.map;
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
	/**
	 * 
	 * @param {tag} container 
	 * @param {} type 
	 * @param {*} feature 
	 */
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
	render(Map){
		Map.markers[Map.markers.length] = new mapboxgl.Marker(this.container)
		.setLngLat(this.feature.geometry.coordinates).addTo(Map.map);
	}
}
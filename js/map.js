"use strict";
//Enums for mapping
const markerType = {
	basic: "basic",
	transport: "transport",
	humanitary: "humanitary",
	medical: "medical"
},
markerParameters = {
	// "icon-size": ['interpolate', ['linear'], ['zoom'], 10, 1, 15, 0.5],
	"icon-allow-overlap": true,
},
types = {
	geojson: "geojson",
	feature: "Feature",
	point: "Point"
},
mapParameters = {
	minZoom: 2, 
    maxZoom: 19
};
//Variables for connecting mapbox API and setting properties of Geocoding
const accessToken = "pk.eyJ1Ijoic3VhYyIsImEiOiJjbDJudDdycXkxNjE1M2lxY3QyOTM3NHV3In0.KkzJGb4qqdkbDH0NequqPA",
searchProperties = ["autocomplete", "bbox", "country", "fuzzyMatch", 
			"language", "limit", "proximity", "routing", "types", "worldview"],
defaultSearchSettings = {"language" : "uk"};
let geojsons = [], markers = [];
mapboxgl.accessToken = accessToken;
/**
 * Initalizes maps and targeting properties to them
 * @param {container} container is consisting of DOM element, where the map'll be displayed
 * @param {style} style - styles to be applied to the container from Mapbox studio
 * @param {center} center - the position of the viewscreen center in lat/lng coordinates
 * @param {zoom} zoom - level of scrolling zoom
 * @param {minZoom & maxZoom} rangeZoom - default zoom ranges 
*/
function mapInit(container, center, zoom) {
	let map = new mapboxgl.Map({
		container: container,
		style: "mapbox://styles/suac/cl2ramh2d000714nwclodz0k9",
		center: center,
		zoom: zoom,
		mapParameters
	});
	return map;
}
/**
 * Render markers for an interactive map
 * @param {typeMarker} typeMarker is a category transformed into enum type by setType() function
 * @param {array} array is an unsorted array of JSON objects containing offers' fields
 * @param {map} map is an object of the Map class
 * @param {inputArray} inputArray is passing through the function to convert into a 2-d array (cluster)
 * @param {sortSettings} sortSettings is a parameter with selected categories (used in the combination with setType())
 * @param {markersCluster} markersCluster is an array of markers to be rendered in the fixed location from DB
*/
function setType (typeMarker) {
	switch(typeMarker) {
		case 'Гумунітарна допомога':
		  return markerType.humanitary;
		case 'Медична допомога':
		  return markerType.medical;
		case 'Автопревезення':
		  return markerType.transport;
		default:
		  return markerType.basic;
	}  
}
function sortArray(array) {
	if (array.length <= 1) {
		return array;
	}
	let midIndex = Math.floor(array.length / 2), middle = array[midIndex], less = [], greater = [];
	for (let i = 0; i < array.length; i++) {
		if(i === midIndex) {
			continue;
		} else if (array[i].adress_coordinates < middle.adress_coordinates) {
			less.push(array[i]);
		} else {
			greater.push(array[i]);
		}
	}
	return [...sortArray(less), middle, ...sortArray(greater)];
}
function createClusters(inputArray, sortSettings) {
	inputArray = sortArray(inputArray);
	let outputArray = [];
	if (sortSettings.length > 0) {
		for (let i = 0; i < inputArray.length; i++) {
			let category = setType(inputArray[i].types_of_work);
			if (sortSettings.indexOf(category) != -1) {
				outputArray.push(inputArray[i]);
			}
		}
	} else {
		outputArray = inputArray;
	}
	let clusters = [[outputArray[0]]];
	for (let i = 1; i < outputArray.length; i++) {
		let fieldDataAdress = outputArray[i];
		if(outputArray[i].adress_coordinates == outputArray[i-1].adress_coordinates) {
			clusters[clusters.length-1].push(fieldDataAdress);
		} else {
			clusters.push([fieldDataAdress]);
		}
	}
	return clusters;
}
function renderMarker(map, markersCluster) {
	// Creation of marker/cluster element
	const element = document.createElement("div");
	element.className = "animate_animated animate__fadeIn";
	if (markersCluster.length > 1) {
		// Apply styles to DOM element which provides a number of offers to exact location and embed to parent
		let clusterRound = document.createElement("div");
		clusterRound.className = "cluster-union";
		clusterRound.addEventListener("click", function() {element.classList.toggle("active");});
		clusterRound.innerText = markersCluster.length;
		element.classList.add("cluster");
		element.appendChild(clusterRound);
		// Constants for execution markers' round placement inside cluster
		let ratioRotate = 2 * Math.PI / markersCluster.length;
		// Adding markers to cluster container
		for (let i = 0; i < markersCluster.length; i++) {
			// Trigonometry operation of building
			let rotateY = -(Math.cos(ratioRotate * i) * 70), rotateX = -(Math.sin(ratioRotate * i) * 70);
			let markerofCluster = document.createElement("div")
			markerofCluster.style.setProperty('--translateX', `${rotateX}px`)
			markerofCluster.style.setProperty('--translateY', `${rotateY}px`)
			markerofCluster.className = `marker ${setType(markersCluster[i].types_of_work)}`;
			element.appendChild(markerofCluster);
		}
	} else {
		element.classList.add(`marker ${setType(markersCluster[i].types_of_work)}`);
	}
	// Object with marker/cluster properties
	const staticMarkerProperties = {
		element,
		markerParameters,
		anchor: markersCluster.length > 1 ? "center" : "bottom",
	};
	//Place marker on map based on coordinates 
	const coordinares = JSON.parse(markersCluster[0].adress_coordinates);
	markers[markers.length] = new mapboxgl.Marker(staticMarkerProperties).setLngLat(coordinares).addTo(map);
}
async function recieveOffersData(map) {
	const response = await fetch('../system/form_get.php', {method: "GET"}),
		  answer = response.json();
	let dataMarker = [];
	answer.then(resolve => {
		if(resolve.hasOwnProperty('array')){
			resolve.array.forEach(item => {
				dataMarker.push(JSON.parse(item));
			});
			dataMarker = sortArray(dataMarker);
			let renderArray = createClusters(dataMarker, []);
			renderArray.forEach(marker => {
				renderMarker(map, marker);
			});
		}
	});
	return dataMarker;
}
/**
 * 
 * @param {search} search is an adress from input box
 * @param {searchSettings} searchSettings is an array with settings for the search request
 * @param {longitude, latitude} coordinates is a geocoding (latitude and longitude)
*/
function convertTextIntoGeocoding(search, searchSettings) {
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
		if (defaultSearchSettings.hasOwnProperty(key) && !searchSettings.hasOwnProperty(key) && searchProperties.includes(key)) {
			request += `${key}=${defaultSearchSettings[key]}&`;
		}
	}
	return `https://api.mapbox.com/geocoding/v5/mapbox.places/${request}access_token=${accessToken}`;
}
function conventCoordinatesIntoGeocoding (longitude, latitude) {
	return `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;
}
async function searchingCoordinates(longitude, latitude){
	const response = await fetch(conventCoordinatesIntoGeocoding(longitude, latitude), {
		method: "GET"
	});
	return response.json();
}
const mapFormContainer = document.getElementById("mapForm"),
	  mapMainContainer = document.getElementById("interactive-map"),
	  filterAdress = document.getElementById("searchTownFilter"),
	  categoryBoxes = document.querySelectorAll(".category-box-help"),
	  formGeocoder = document.querySelectorAll(".geocoding-block"),
	  triggerFilter = document.querySelector(".trigger-open-filter");
// Set control functions for the map inside the offer Form
let mapForm = mapInit(mapFormContainer, [35.393, 48.282], 7.63)
	.addControl(new mapboxgl.NavigationControl())
	.on('load', function() {
		this.loadImage(
			'../img/markers/basic.png',
			(error, image) => {
				if (error) throw error;
				// Choose an image for layer
				this.addImage('basic', image);
				// Target geocoding data to layer
				this.addSource('single-point', {
					type: 'geojson',
					data: {
					  type: 'FeatureCollection',
					  features: []
					}
				});
				// Set default marker on the map field inside request building form
				this.addLayer({
					'id': 'points',
					'type': 'symbol',
					'source': 'single-point',
					'layout': {
						'icon-image': 'basic', 
						'icon-size': 0.1,
						'icon-anchor': 'bottom'
					}
				});
			}
		);
	})
	.on('click', (event) => {
		let longitude = event.lngLat.lng, latitude = event.lngLat.lat;
		searchingCoordinates(longitude, latitude).then(resolve => {
			mapForm.getSource('single-point').setData(resolve.features[0].geometry);
			adressLine = resolve.features[0].geometry.coordinates;
			geocoder.container.children[1].value = resolve.features[0].place_name;
		});
	});
let mapMain = mapInit(mapMainContainer, [32.504, 48.464], 5.18)
	.addControl(new mapboxgl.NavigationControl());
let jsonDataMarker = recieveOffersData(mapMain),
	mapSettings = [];
// Listeners for geocoding and filtrating
triggerFilter.addEventListener("click", function() {
    this.parentNode.children[0].classList.toggle("active");
});
for (let category of categoryBoxes) {
    category.addEventListener("click", function(e) {
        this.classList.toggle("active");
        if (this.classList.contains("active")) {
            mapSettings.push(this.getAttribute("data-category-marker"));
        } else {
        const getIndex = mapSettings.indexOf(this.getAttribute("data-category-marker"));
            if (getIndex > -1) {
                mapSettings.splice(getIndex, 1);
            }
        }
        let renderArray = createClusters(jsonDataMarker, mapSettings);
        if (markers!==null) {
			for (var i = markers.length - 1; i >= 0; i--) {
				markers[i].remove();
			}
		}
        renderArray.forEach(marker => {
            renderMarker(mapMain, marker);
        });
    });
}
for (let geoBlock of formGeocoder) {
	geoBlock.querySelector("input.search-adress").addEventListener("input", async function() {
		const response = await fetch(convertTextIntoGeocoding(this.value, {limit: 5}), {
			method: "GET"
		})
		.then(resolve => {resolve.json()
			.then(result => {
				let suggestionsWrapper = geoBlock.querySelector("adress-lines-suggestions")
						.innerHTML = "",
					resultsarr = result.features;
				if(resultsarr.length != 0) {
					for(let num = 0; num <  resultsarr.length; num++) {
						if (resultsarr[num].place_type.includes("address") || resultsarr[num].place_type.includes("poi")) {
							let feature = document.createElement("li"),
								mainPlace = resultsarr[num].text,
								description = resultsarr[num].place_name.replace(`${resultsarr[num].text}, `, "");
								feature.setAttribute("data-place", num);
							feature.addEventListener("click", function() {
								mapMain.flyTo({
									center: resultsarr[this.getAttribute("data-place")].center,
									essential: true, 
									zoom: 18.34
								});
							});
							feature.innerHTML = `<b>${mainPlace}</b><p>${description}</p>`;
							suggestionsWrapper.appendChild(feature);
						}
					} 
				}
			});
		});
	});
	geoBlock.querySelector(".cross-input").addEventListener("click", function() {
		this.previousSibling.value = "";
	});
}









































// let cardVT = document.querySelector("#volunteering-output"),
// 	closeVT = document.querySelectorAll(".nav-trigger.close-trigger"),
// 	infoVT = document.querySelector(".main-text-card").children,
// 	modalTimer = document.querySelectorAll(".timer-set > b");
// var clockIntervalTV;
// closeVT.forEach(closeBtn => {
// 	closeBtn.addEventListener("click", () => {
// 		cardVT.classList.toggle("active");
// 	});
// });
// function setTimer(dataTime, inputInterval) {
// 	clearInterval(inputInterval);
// 	let countDownDate = new Date(dataTime),
// 	outputInterval = setInterval(function() {
// 		let now = new Date().getTime(),
// 			distance = countDownDate - now;
// 		modalTimer[0].innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
// 		modalTimer[1].innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// 		modalTimer[2].innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
// 		modalTimer[3].innerText = Math.floor((distance % (1000 * 60)) / 1000);
// 	}, 1000);
// 	return outputInterval;
// }
// function uploadVolunteeringData() { 
// 	console.log(jsonDataMarker);
// 	let id = this.getAttribute("data-marker");
// 	infoVT[0].innerText = jsonDataMarker[id].title;
// 	infoVT[1].innerText = jsonDataMarker[id].main_text;
// 	let placeType = JSON.parse(jsonDataMarker[id].adress_coordinates);
// 	clockIntervalTV = setTimer(jsonDataMarker[id].deadline, clockIntervalTV);
// 	searchingCoordinates(placeType.coordinates[0], placeType.coordinates[1]).then((resolve) => {
// 		console.log(resolve);
// 		infoVT[2].innerText = "Адреса: " + resolve.features[0].place_name;
// 	});
// 	cardVT.classList.add("active");
// }

// Check if the code is working
console.log('working');


// Map Object with center and zoom level
// let map = L.map('mapid').setView([40.7, -94.5], 4);
// let map = L.map('mapid', {
//     center:[
//         30, 30
//     ],
//     zoom: 2
// });


// MAP A GEOJSON POINT
// Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// Grabbing our GeoJSON data
// L.geoJSON(sanFranAirport).addTo(map);

// pointToLayer Function
// L.geoJSON(sanFranAirport, {
//     // Turn each feature into a marker on the map
//     pointToLayer: function (feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup('<h2>' + feature.properties.name + '</h2>' +  '<hr>' + '<h3>' + feature.properties.city +  ', ' + 
//             feature.properties.country + '</h3>');
//     }
// }).addTo(map);

// onEachFeature Function
// L.geoJSON(sanFranAirport, {
//     onEachFeature: function (feature, layer) {
//         console.log(layer);
//         layer.bindPopup('<h2>' + 'Airport code: ' + feature.properties.faa + '</h2>'
//         + '<hr>' + '<h3>' + 'Airport name: ' + feature.properties.name + '</h3>');
//     }
// }).addTo(map);



// Load and display Tile Layer (static tiles api format)
// Background of our map
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
//     });



// Graymap Tile Layer (add 'streets' tile layer to the map)
// streets.addTo(map);

// // ACCESSING THE AIRPORT GEOJSON URL
// let airportData = 'https://raw.githubusercontent.com/t-nicole13/Mapping_Earthquakes/main/majorAirports.json';

// // GRABBING OUR GEOJSON DATA
// d3.json(airportData).then(function(data) {
//     console.log(data);
//     // creating a GeoJSON layer with the retrieved data
//     L.geoJSON(data, {
//         onEachFeature: function(feature, layer) {
//             layer.bindPopup('<h2>' + 'Airport code: ' + feature.properties.faa + '</h2>' 
//             + '<hr>' + '<h3>' + 'Airport name: ' + feature.properties.name + '<h3>')
//         }
//     }).addTo(map)
// });


// ADD MULTIPLE MAPS 

// TILE LAYER - DARK
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
    });



// TILE LAYER - STREETS
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
    });

// BASE MAP VARIABLE - HOLDS BOTH MAPS
let baseMaps = {
    Street: streets,
    Dark: dark
}

// MAP OBJECT 
let map = L.map('mapid', {
    center: [30,30],
    zoom: 2,
    layers: [streets]
});

// LAYER CONTROL
L.control.layers(baseMaps).addTo(map);

// ADD DATA TO THE MAP
let airportData = 'https://raw.githubusercontent.com/t-nicole13/Mapping_Earthquakes/main/majorAirports.json';

d3.json(airportData).then(function(data) {
    console.log(data);
    // GEOJSON LAYER
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup('<h2>' + 'Airport code: ' + feature.properties.faa + '</h2>'
            + '<hr>' + '<h3>' + 'Airport name: ' + feature.properties.name + '</h3>')
        }
    }).addTo(map)
});
// Check if the code is working
console.log('working');


// Map Object with center and zoom level
// let map = L.map('mapid').setView([40.7, -94.5], 4);
let map = L.map('mapid', {
    center:[
        36.6213, -122.3790
    ],
    zoom: 4
});

// Add a marker for Los Angeles, CA
// let marker = L.marker([34.0522, -118.2437]).addTo(map);
// L.circle([34.0522, -118.2437], {
//     color: 'black',
//     fillColor: 'yellow',
//     radius: 300
// }).addTo(map);

// Add circle to the map
// L.circleMarker([34.0522, -118.2437], {
//     radius: 300,
//     color: 'black',
//     fillColor: '#ffffa1'
// }).addTo(map);

// Get data from cities.js
// let cityData = cities;

  // Loop through the cities array and create one marker for each city
//   cityData.forEach(function(city) {
//       // console.log(city);
//       L.marker(city.location)
//       .bindPopup('<h2>' + city.city + ', '  + city.state + '</h2><hr><h3>Population ' + city.population.toLocaleString() + '</h3>')
//       .addTo(map);
//   });

// Loop through the cities array and create one circle marker for each city
// cityData.forEach(function(city) {
//     L.circleMarker(city.location, {
//         radius: city.population / 200000,
//         color: 'orange',
//         lineweight: 4
//     })
//     .bindPopup('<h2>' + city.city + ', '  + city.state + '</h2><hr><h3>Population ' + city.population.toLocaleString() + '</h3>')
//     .addTo(map);
// });


// map a single line
// Coordinates for each point to be used in the line.
// let line = [
//     [33.9416, -118.4085],
//     [37.6213, -122.3790]
//   ];

//   L.polyline(line, {
//       color: 'red'
//   }).addTo(map);

// map multiple lines
// Coordinates for each point to be used in the polyline.
// let line = [
//     [33.9416, -118.4085],
//     [37.6213, -122.3790],
//     [40.7899, -111.9791],
//     [47.4502, -122.3088]
//   ];

//   L.polyline(line, {
//       color: 'yellow'
//   }).addTo(map);

// SKILL DRILL - create an airline route from SFO to John F. Kennedy International Airport (JFK) with two stops, 
// Austin-Bergstrom International Airport (AUS) and Toronto Pearson International Airport (YYZ)

// Make the route a blue dashed line, with a weight of 4 and opacity of 0.5 on the light map.

// Add your city or another city as a stopping point.

let line = [
    [37.6213, -122.3790],
    [30.1975, -97.6664],
    [30.1975, -97.6664],
    [43.6777, -79.6248],
    [40.6413, -73.7781]
];

L.polyline(line, {
    color: 'blue',
    weight: 4,
    opacity: 0.5,
    dashArray: 4
}).addTo(map);


// Load and display Tile Layer (static tiles api format)
// Background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
    });

// Graymap Tile Layer (add 'streets' tile layer to the map)
streets.addTo(map);
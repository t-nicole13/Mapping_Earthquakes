// Check if the code is working
console.log('working');


// Map Object with center and zoom level
// let map = L.map('mapid').setView([40.7, -94.5], 4);
let map = L.map('mapid', {
    center:[
        34.0522, -118.2437
    ],
    zoom: 14
});

// Add a marker for Los Angeles, CA
// let marker = L.marker([34.0522, -118.2437]).addTo(map);
// L.circle([34.0522, -118.2437], {
//     color: 'black',
//     fillColor: 'yellow',
//     radius: 300
// }).addTo(map);

// Add circle to the map
L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color: 'black',
    fillColor: '#ffffa1'
}).addTo(map);


// Load and display Tile Layer (static tiles api format)
// Background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
    });

// Graymap Tile Layer (add 'streets' tile layer to the map)
streets.addTo(map);

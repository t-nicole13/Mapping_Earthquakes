// check
console.log('works!');

// TILE LAYERS
// streets
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
    });


// satellite streets
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
    });


// BASE MAPS
let baseMaps = {
    'Streets': streets,
    'Satellite Streets': satelliteStreets
};

// MAP OBJECT
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets] // SKILL DRILL - 4. Make the default map layer Streets with Satellite Streets as the second option.
});

// LAYER CONTROL
L.control.layers(baseMaps).addTo(map);

// ACCESS TOR NEIGHBORHOODS VARIABLE
let torontoHoods = 'https://raw.githubusercontent.com/t-nicole13/Mapping_Earthquakes/main/torontoNeighborhoods.json';

d3.json(torontoHoods).then(function(data) {
    L.geoJSON(data, {
        // SKILL DRILL - 1. Make the lines blue, with a weight of 1.
        // SKILL DRILL -  2. Make the polygon fill color yellow.
        color: 'blue',
        fillColor: 'yellow',
        weight: 1,
        // SKILL DRILL - 3. Add a popup to show each neighborhood.
        onEachFeature: function(feature, layer) {
            layer.bindPopup('<h3>' + 'Neighborhood: ' + feature.properties.AREA_NAME + '</h3>')
        }
        
       
    }).addTo(map);
});

// SKILL DRILL 
// 1. Make the lines blue, with a weight of 1.
// 2. Make the polygon fill color yellow.
// 3. Add a popup to show each neighborhood.
// 4. Make the default map layer Streets with Satellite Streets as the second option.




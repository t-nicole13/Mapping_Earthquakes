// CHECK IF CODE IS WORKING 
console.log('working');

// MAP STYLES 
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


// BASE LAYER
let baseMaps = {
    'Streets': streets,
    'Satellite': satelliteStreets
};


// MAP OBJECT
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// LAYER CONTROL
L.control.layers(baseMaps).addTo(map);

// GET EARTHQUAKE DATA 
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) {
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },

        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup('Magnitude: ' + feature.properties.mag + '<br>Location: ' + feature.properties.place);
        }

    }).addTo(map);
});


// STYLE DATA
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
    }

// CIRCLE COLOR BASED ON MAGNITUDE
function getColor(magnitude) {
    if (magnitude > 5) {
        return '#ea2c2c';
    }
    if (magnitude > 4) {
        return '#ea822c';
    }   
    if (magnitude >3) {
        return '#ee9c00';
    }
    if (magnitude > 2) {
        return '#eecc00'
    }
    if (magnitude > 1) {
        return '#d4ee00';
    }
    return '#98ee00';
}


// RADIUS SIZE BASE ON MAGNITUDE
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}






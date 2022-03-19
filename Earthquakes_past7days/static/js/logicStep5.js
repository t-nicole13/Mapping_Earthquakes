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

// EARTHQUAKE LAYER
let earthquakes = new L.layerGroup();

// OVERLAY OBJECT
let overlays = {
    Earthquakes: earthquakes
};


// MAP OBJECT
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// LAYER CONTROL
L.control.layers(baseMaps, overlays).addTo(map);

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
        // TURN OVERLAY BUTTON 'ON'
    }).addTo(earthquakes);

    // ADD EARTHQUAKE LAYER TO MAP
    earthquakes.addTo(map);
});



// ADD A LEGEND
let legend = L.control({
    position: 'bottomright'
});

legend.onAdd = function () {

    let div = L.DomUtil.create('div', 'info legend');
        const magnitudes = [0, 1, 2, 3, 4, 5];
        const colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
          ];

   // Looping through our intervals to generate a label with a colored square for each interval.
   for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
 }
  return div;
};

legend.addTo(map);



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






// Check if the code is working
console.log('working');

// TILE LAYER - DARK
// let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
//     });


//  // TILE LAYER - LIGHT
//  let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
//  }); 

 // SKILL DRILL - 1. The default map layer as night navigation with day navigation as another option.
 let night =L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
    });

    let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
        });
    
 let baseMaps = {
     Night: night,
     Day: day
 }       


 // BASE MAP
//  let baseMaps = {
//     Dark: dark,
//     Light: light
// }

  // MAP OBJECT
  let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [day],
 });


  // LAYER CONTROL
  L.control.layers(baseMaps).addTo(map);



// ACCESSING TOR AIRLINES ROUTE GEOJSON URL
 let torontoData = 'https://raw.githubusercontent.com/t-nicole13/Mapping_Earthquakes/main/torontoRoutes.json';

 d3.json(torontoData).then(function(data) {
    console.log(data);
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            // SKILL DRILL - 2. The airline routes are in light yellow with a weight of 2.
            // layer.setStyle({
            //     color: 'yellow',
            //     weight: 2
            // }),

            layer.setStyle(myStyle)

            // SKILL DRILL - 3. Each airline route has a popup marker that shows the airline code and destination.
            layer.bindPopup('<h2>' + 'Airline: ' + feature.properties.airline + '</h2>' + 
            '<hr>' + '<h3>' + 'Destination: ' + feature.properties.dst + '</h3>');
        }
    }).addTo(map);
 });

 // STYLE THE LINES
 let myStyle = {
     color: '#ffffa1',
     weight: 2
 }


 // SKILL DRILL - Edit the L.geoJSON() layer so that it displays the following: 
 // 1. The default map layer as night navigation with day navigation as another option.
 // 2. The airline routes are in light yellow with a weight of 2.
 // 3. Each airline route has a popup marker that shows the airline code and destination.



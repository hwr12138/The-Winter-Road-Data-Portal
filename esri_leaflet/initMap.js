// initiate the checkboxes
var checkboxes = document.getElementsByTagName('input');
for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].type == 'checkbox') {
        checkboxes[i].checked = false;
    }
}
var initLayers = 12;
for (var i = 0; i < initLayers; i++) {
    if (mapLayers[i].layerNum != 2) {
        document.getElementById(mapLayers[i].layerid).checked = true;
    }
}

// Add map baselayer
//const apiKey = "AAPK04a21f4c55474dc584334fc5da8479cc19Lcfom4rwG-pUXZuAGcNuvbUU0xdHhgJSVZNSJl4GYFYWWQoyX0Ol3LabbdD3b9";
const map = L.map('mapid').setView([65, -103], 4).on('zoomend', function(e) { zoomHandler(); });
var basemapLayer = L.esri.basemapLayer('Streets', { /*tileSize: 512, zoomOffset: -1, detectRetina: true*/ }).addTo(map);
//var basemapLayer = L.esri.tiledMapLayer({ url: "https://basemaps-api.arcgis.com/arcgis/rest/services/styles/{basemapStyle}?type={type}&token=<AAPK04a21f4c55474dc584334fc5da8479cc19Lcfom4rwG-pUXZuAGcNuvbUU0xdHhgJSVZNSJl4GYFYWWQoyX0Ol3LabbdD3b9>" })
//var basemapLayer = L.esri.Vector.vectorBasemapLayer("ArcGIS:Streets", { apiKey: apiKey, maxZoom: 20 }).addTo(map);
var layerLabels;

var clusteredMarkers = L.markerClusterGroup(); //.layerSupport(),
//myLayerGroup = L.layerGroup();
var numOfClusterLayer = 6;
var markersArray = new Array(numOfClusterLayer);
for (var i = 0; i < numOfClusterLayer; i++) {
    markersArray[i] = L.markerClusterGroup();
    setClusterMarkers(i);
}
map.addLayer(clusteredMarkers);
//clusteredMarkers.checkIn(myLayerGroup);
//myLayerGroup.addTo(map);

//var geojson = L.geoJSON(apNWT).addTo(map);
/*$.getJSON("./EnhancedPOI_territories_Feat.geojson", function(data) {
    //data = JSON.parse(data);
    var StratfordBoundary = L.geoJSON(data, {
        //onEachFeature: function onEachFeature(feature, layer) {layer.bindPopup('<strong>' + feature.properties.NAME + '</strong><br><br>Description: ');}
    }).addTo(map);
});*/
/*var geojson = new L.GeoJSON.AJAX("EnhancedPOI_territories_Feat.geojson");
geojson.on('data:loaded', function() {
    geojson.addTo(map);
});*/

// change basemap
document
    .querySelector('#basemap')
    .addEventListener('change', function(e) {
        var basemap = e.target.value;
        setBasemap(basemap);
    });

document
    .querySelector('#layers')
    .addEventListener('change', function(e) {
        var layer = e.target.value;
        setLayer(layer);
    });

// Add initial polyline layers
for (var i = 0; i < initLayers; i++) {
    if (mapLayers[i].layerNum != 2 && mapLayers[i].layerNum != 7) {
        setPolylineLayer(i);
    } else if (mapLayers[i].layerNum == 7) {
        setLayer('real_time_data');
    }
}

/*document
    .querySelector('#getAttachment')
    .addEventListener('click', function(e) {
        document.querySelectorAll('input.submit').click();
    });*/

// prepare city marker layers
var layer1 = L.layerGroup();
var layer2 = L.layerGroup();
var layer3 = L.layerGroup();
var layer4 = L.layerGroup();
// layer1 zoom level < 6
for (var i = 0; i < cityInfo.length; i++) {
    addFullMarker(cityInfo, i, layer1);
}
layer1.addTo(map);
// layer2 zoom level = 6
for (var i = 0; i < cityInfo.length; i++) {
    addCirMarker(cityInfo, i, layer2)
}
for (var i = 0; i < commuInfo.length; i++) {
    if (commuInfo[i].nameOnMap <= 6) {
        addCirMarker(commuInfo, i, layer2);
    } else {
        addFullMarker(commuInfo, i, layer2);
    }
}
// layer3 zoom level = 7
for (var i = 0; i < cityInfo.length; i++) {
    addCirMarker(cityInfo, i, layer3)
}
for (var i = 0; i < commuInfo.length; i++) {
    if (commuInfo[i].nameOnMap <= 7) {
        addCirMarker(commuInfo, i, layer3);
    } else {
        addFullMarker(commuInfo, i, layer3);
    }
}
// layer4 8 <= zoom level
for (var i = 0; i < cityInfo.length; i++) {
    addCirMarker(cityInfo, i, layer4)
}
for (var i = 0; i < commuInfo.length; i++) {
    if (commuInfo[i].nameOnMap <= 8) {
        addCirMarker(commuInfo, i, layer4);
    } else {
        addFullMarker(commuInfo, i, layer4);
    }
}
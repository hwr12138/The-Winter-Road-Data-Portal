function setBasemap(basemap) {
    if (basemapLayer) {
        map.removeLayer(basemapLayer);
    }
    basemapLayer = L.esri.basemapLayer(basemap, { tileSize: 512, zoomOffset: -1, detectRetina: true })
        //basemapLayer = L.esri.Vector.vectorBasemapLayer("ArcGIS:" + basemap, { apiKey: apiKey });
    map.addLayer(basemapLayer);
    if (layerLabels) {
        map.removeLayer(layerLabels);
    }
    if (basemap.includes('Imagery')) {
        layerLabels = L.esri.basemapLayer('ImageryLabels');
        map.addLayer(layerLabels);
    }
}

function setPolylineLayer(i) {
    if (mapLayers[i].layerNum == 3) {
        activeLayers[i] = L.esri.featureLayer({
            url: url[0] + mapLayers[i].layerNum,
            style: function(feature, layer) {
                var c;
                if (feature.properties.ispaved_en == 'True') {
                    c = 'red';
                } else {
                    c = 'black';
                }
                return { color: c, weight: 3 };
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(layerContent(i, feature));
            }
        }).addTo(map);
        //activeLayers[i].on('mouseout', mouseOut);
        //mouseOver(i);
    } else if (mapLayers[i].layerNum == 23) {
        activeLayers[i] = L.esri.featureLayer({
            url: url[2] + '0',
            style: function(geojson, layer) {
                var c;
                if (geojson.properties.SURFACE == ' Winter_Rd') {
                    c = 'blue';
                } else if (geojson.properties.SURFACE == 'GRAVEL') {
                    c = 'black';
                } else if (geojson.properties.SURFACE == 'Unpaved') {
                    c = 'green';
                } else if (geojson.properties.SURFACE == 'Paved') {
                    c = 'red';
                } else if (geojson.properties.SURFACE == 'Chipseal') {
                    c = 'yellow';
                } else if (geojson.properties.SURFACE == 'Inactive') {
                    c = 'gray';
                } else {
                    c = 'white';
                }
                return { color: c, weight: 3 };
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(layerContent(i, feature));
            }
        }).addTo(map);
        //activeLayers[i].on('mouseout', mouseOut);
        //mouseOver(i);
    } else {
        if (mapLayers[i].layerNum == 27) {
            activeLayers[i] = L.esri.featureLayer({
                url: url[1] + '0',
                style: { color: mapLayers[i].layerColor, weight: 3 },
                onEachFeature: function(feature, layer) {
                    layer.bindPopup(layerContent(i, feature));
                }
            }).addTo(map);
            //activeLayers[i].on('mouseout', mouseOut);
            //mouseOver(i);
        } else {
            activeLayers[i] = L.esri.featureLayer({
                url: url[0] + mapLayers[i].layerNum,
                style: { color: mapLayers[i].layerColor, weight: 3 },
                onEachFeature: function(feature, layer) {
                    layer.bindPopup(layerContent(i, feature));
                }
            }).addTo(map);
            //activeLayers[i].on('mouseout', mouseOut);
            //mouseOver(i);
        }
    }
}

function mouseOut() {
    document.getElementById('info-pane').innerHTML = 'Hover to Inspect';
}

function layerContent(i, feature) {
    var target = mapLayers[i].layerNum;
    if (target == 1) {
        return "Name: " + feature.properties.STREET + "<br>Type: " + feature.properties.STREETNAME + "<br>CARTO: " + feature.properties.CARTO + "<br>Left Maf: " + feature.properties.LEFT_MAF + "<br>Right Maf: " + feature.properties.RIGHT_MAF + "<br>Beginning Elevation: " + feature.properties.BEGELEV + "<br>Ending Elevation: " + feature.properties.ENDELEV + "<br>Shape Length: " + feature.properties.Shape__Length;
    } else if (target == 3) {
        return "Name: " + feature.properties.rdsegnamen + "<br>Is Paved: " + feature.properties.ispaved_en + "<br>Shape Length: " + feature.properties.Shape__Length;
    } else if (target == 23) {
        return "Name 1: " + feature.properties.ROADNAME + "<br>Name 2: " + feature.properties.RTENAME2EN + "<br>Surface: " + feature.properties.SURFACE + "<br>Shape Length: " + feature.properties.Shape__Length;
    } else if (target == 21) {
        return "Name 1: " + feature.properties.RTENAME1EN + "<br>Name 2: " + feature.properties.RTENAME2EN + "<br>Road Class: " + feature.properties.ROADCLASS + "<br>Closed in: " + feature.properties.CLOSING + "<br>Shape Length: " + feature.properties.Shape__Length;
    } else if (target == 27) {
        return "Name: " + feature.properties.ROADNAME + "<br>Road Type: " + feature.properties.ROADTYPE + "<br>Shape Length: " + feature.properties.Shape__Length;
    } else if (target == 16) {
        return "Name: " + feature.properties.name + "<br>Oneway: " + feature.properties.oneway + "<br>Bridge: " + feature.properties.bridge + "<br>Tunnel: " + feature.properties.tunnel + "<br>Shape Length: " + feature.properties.Shape__Length;
    } else if (target == 4) {
        return "Num of Tracks: " + feature.properties.numtracks + "<br>Classification: " + feature.properties.classif_en + "<br>use: " + feature.properties.use_en + "<br>Status: " + feature.properties.status_en + "<br>Shape Length: " + feature.properties.Shape__Length;
    } else if (target == 24) {
        return "Feature: " + feature.properties.FEATURE + "<br>Segment Length (km): " + feature.properties.SEG_LEN_KM + "<br>Structure Type: " + feature.properties.STRUCT_TYP + "<br>Beginning Elevation: " + feature.properties.BEGELEV + "<br>Ending Elevation: " + feature.properties.ENDELEV + "<br>Shape Length: " + feature.properties.Shape__Length;
    } else if (target == 2) {
        return "Shape Length: " + feature.properties.Shape__Length;
    } else if (target == 5) {
        return "First Nations Name: " + feature.properties.FN_NAME + "<br>Route Name: " + feature.properties.ROUTE_NAME + "<br>Shape Length: " + feature.properties.Shape__Length;
    } else if (target == 6) {
        return "Name: " + feature.properties.TOURISM_TR + "<br>Shape Length: " + feature.properties.Shape__Length;
    } else if (target == 0) {
        return 'Name: ' + feature.properties.NAME + ' Airport<br>Surface: ' + feature.properties.RUNWAY_SUR + 'Terminal: ' + feature.properties.TERMINAL + 'Elevation (ft): ' + feature.properties.ELEVATION_ + 'Length (ft): ' + feature.properties.LENGTH_FT + 'Width (ft): ' + feature.properties.WIDTH_FT + 'Maintenance: ' + feature.properties.MAINTENANC + 'Feature Type: ' + feature.properties.FEATURE_TY;
    } else if (target == 14) {
        return 'Name: ' + feature.properties.NAME_ALIAS + '<br>Surface: ' + feature.properties.Runway_Typ + 'Elevation: ' + feature.properties.ELEVATION;
    } else if (target == 20) {
        return 'Name: ' + feature.properties.NAME_ALIAS + '<br>Surface: ' + feature.properties.Runway_Typ + 'Length (ft)' + feature.properties.Runway_Len + 'Status: ' + feature.properties.STATUS + 'Accessible: ' + feature.properties.Accessible;
    } else if (target == 15) {
        return 'Name: ' + feature.properties.NAME + '<br>Address: ' + feature.properties.ADDRESS + '<br>City: ' + feature.properties.CITY + '<br>Postal Code: ' + feature.properties.POST_CODE + '<br>Phone: ' + feature.properties.PHONE + '<br>Elevation: ' + feature.properties.ELEVATION;
    } else if (target == 7) {
        var attachmentUrl = url[3] + "/" + feature.properties.OBJECTID + "/attachments?f=html&token=";
        return 'Name: ' + feature.properties.NAME + '<br>Category: ' + feature.properties.Category + '<br>Location: ' + feature.properties.Location + '<br>Comments: ' + feature.properties.Comments + '<br><button class="getAttachment" onclick="window.open(\'' + attachmentUrl + '\');">Click to Get Attachments</button>' //<input type="button" onclick="location.href=\'' + attachmentUrl + '\';" value="Attachment" />';
    }
}

function airportPopup(source, input, i) {
    if (input == 0) {
        return "Name: " + source[input][i].Name + "<br>Elevation: " + source[input][i].elevation + "<br>Length (ft): " + source[input][i].length;
    } else if (input == 1) {
        return "Name: " + source[input][i].Name + "<br>Elevation: " + source[input][i].elevation;
    } else {
        return "Name: " + source[input][i].Name + "<br>Length (ft): " + source[input][i].length;
    }
}

function setClusterMarkers(input) {
    var source = [airportYukon, airportNWT, airportNU, medNU, portCommuNWT, poi];
    if (input < 3) {
        /*var sourceLen = [32, 27, 27];
        for (var i = 0; i < sourceLen[input]; i++) {
            var feature = source[input].features[i];
            var surface;
            if (input == 0) {
                surface = feature.properties.RUNWAY_SUR;
            } else {
                surface = feature.properties.Runway_Typ;
            }
            if (surface == "Pavement" || surface == 'Paved') {
                new L.marker(feature.geometry.coordinates, {
                    icon: paved_airport_icon
                }).bindPopup(layerContent(input + 12, feature), { offset: L.point([3, -13]) }).addTo(markersArray[input]);
            } else {
                new L.marker(feature.geometry.coordinates, {
                    icon: unpaved_airport_icon
                }).bindPopup(layerContent(input + 12, feature), { offset: L.point([3, -13]) }).addTo(markersArray[input]);
            }
        }*/
        for (var i = 0; i < source[input].length; i++) {
            if (source[input][i].surface == "Pavement") {
                new L.marker([source[input][i].lat, source[input][i].lng], {
                    icon: paved_airport_icon
                }).bindPopup(airportPopup(source, input, i), { offset: L.point([3, -13]) }).addTo(markersArray[input]);
            } else {
                new L.marker([source[input][i].lat, source[input][i].lng], {
                    icon: unpaved_airport_icon
                }).bindPopup(airportPopup(source, input, i), { offset: L.point([3, -13]) }).addTo(markersArray[input]);
            }
        }
    } else if (input < 4) {
        for (var i = 0; i < source[input].length; i++) {
            L.marker([source[input][i].lat, source[input][i].lng], {
                icon: hospital_icon
            }).bindPopup('Name: ' + source[input][i].Name, { offset: L.point([3, -13]) }).addTo(markersArray[input]);
        }
    } else if (input < 5) {
        for (var i = 0; i < source[input].length; i++) {
            L.marker([source[input][i].lat, source[input][i].lng], {
                icon: port_icon
            }).addTo(markersArray[input]);

        }
    } else {
        /*L.esri.featureLayer({
            url: url[4],
            onEachFeature: function(feature, layer) {
                layer.bindPopup(layerContent(17, feature));
            }
        }).addTo(markersArray[input]);*/
        markersArray[input].addLayer(L.esri.Cluster.featureLayer({
            url: url[4],
            onEachFeature: function(feature, layer) {
                layer.bindPopup(layerContent(17, feature));
            }
        }));
    }
}

function setPolygon(i) {
    activeLayers[i] = L.esri.featureLayer({
        url: url[0] + mapLayers[i].layerNum,
        simplifyFactor: 0.5,
        precision: 5,
        style: { color: mapLayers[i].layerColor, weight: 2 }
    }).addTo(map);
}

// Add feature layers
function setLayer(input) {
    for (let i = 0; i < mapLayers.length; i++) {
        if (input == mapLayers[i].layerid) {
            if (activeLayers[i]) {
                if (i >= initLayers && i < initLayers + numOfClusterLayer) {
                    clusteredMarkers.removeLayer(markersArray[i - initLayers]);
                } else if (mapLayers[i].layerType == "polygon") {
                    document.getElementById(input + "Legend").classList.toggle("hide");
                    map.removeLayer(activeLayers[i]);
                } else {
                    map.removeLayer(activeLayers[i]);
                }
                activeLayers[i] = false;
            } else if (mapLayers[i].layerType == "polyline") {
                setPolylineLayer(i);
            } else if (mapLayers[i].layerType == "polygon") {
                document.getElementById(input + "Legend").classList.toggle("hide");
                setPolygon(i);
            } else if (mapLayers[i].layerType == "data") {
                activeLayers[i] = L.esri.Cluster.featureLayer({
                    url: url[3],
                    pointToLayer: function(geojson, latlng) {
                        return L.marker(latlng, {
                            icon: new L.DivIcon({
                                html: '<svg height="15" width="15"><polygon points="0,0 0,15 15,15 15,0" style="fill:aqua" /></svg>'
                            })
                        });
                    },
                    //style: { icon: green_icon },
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(layerContent(i, feature));
                    }
                }).addTo(map);
            } else {
                clusteredMarkers.addLayer(markersArray[i - initLayers]);
                /*markersArray[i - initLayers].on('mouseover', function(e) {
                    document.getElementById('info-pane').innerHTML = e.layer.feature.name;
                });*/
                activeLayers[i] = true;

            }
            break;
        }
    }
}

function showCity() {
    var latLng = this.getLatLng();
    for (var i = 0; i < cityInfo.length; i++) {
        if (!document.getElementById(cityInfo[i].cityId).classList.contains("hide")) {
            document.getElementById(cityInfo[i].cityId).classList.toggle("hide");
        }
        if (latLng.lat == cityInfo[i].lat && latLng.lng == cityInfo[i].lng) {
            document.getElementById(cityInfo[i].cityId).classList.toggle("hide");
        }
    }
    for (var i = 0; i < commuInfo.length; i++) {
        if (!document.getElementById(commuInfo[i].cityId).classList.contains("hide")) {
            document.getElementById(commuInfo[i].cityId).classList.toggle("hide");
        }
        if (latLng.lat == commuInfo[i].lat && latLng.lng == commuInfo[i].lng) {
            document.getElementById(commuInfo[i].cityId).classList.toggle("hide");
        }
    }
}

function zoomHandler() {
    var currentZoom = map.getZoom();
    if (currentZoom < 6) {
        // show cities
        map.removeLayer(layer2);
        map.removeLayer(layer3);
        map.removeLayer(layer4);
        layer1.addTo(map);
    } else if (currentZoom < 7) {
        // show all commu
        map.removeLayer(layer1);
        map.removeLayer(layer3);
        map.removeLayer(layer4);
        layer2.addTo(map);
    } else if (currentZoom < 8) {
        // show all commu
        map.removeLayer(layer1);
        map.removeLayer(layer2);
        map.removeLayer(layer4);
        layer3.addTo(map);
    } else {
        map.removeLayer(layer1);
        map.removeLayer(layer2);
        map.removeLayer(layer3);
        layer4.addTo(map);
    }
}

function addFullMarker(info, i, target) {
    new L.Marker([info[i].lat, info[i].lng], {
        icon: new L.DivIcon({
            className: 'divIcon',
            html: '<i onclick="showCity("' + info[i].cityId + '")" class="far fa-circle" style="font-size: 15px;width: 200px;"><span style="font-family: \'Roboto\', sans-serif;">' + info[i].cityName + '</span></i>',
        })
    }).on('click', showCity).on('mouseover', function(e) {
        var arr = ["1", "2", "3", "4", "5"];
        var picArr = ["./gas-pump-solid.svg", "./hotel-solid.svg", "./utensils-solid.svg", "./hospital-symbol-solid.svg", "./police.png"];
        if (info[i].services == "") {
            document.getElementById('info-pane').innerHTML = 'No Services';
            return;
        }
        for (var k = 0; k < arr.length; k++) {
            if (info[i].services.includes(arr[k])) {
                if (k == 0) {
                    document.getElementById('info-pane').innerHTML = "";
                }
                assist(picArr[k]);
            }
        }
    }).on('mouseout', mouseOut).addTo(target);
}

function assist(src) {
    var img = document.createElement("img");
    img.src = src;
    img.classList.add('servicesLabel')
    document.getElementById('info-pane').appendChild(img);
}

function addCirMarker(info, i, target) {
    new L.Marker([info[i].lat, info[i].lng], {
        icon: new L.DivIcon({
            className: 'divIcon',
            html: '<i onclick="showCity("' + info[i].cityId + '")" class="far fa-circle" style="font-size: 15px;"></i>',
        })
    }).on('click', showCity).on('mouseover', function(e) {
        var arr = ["1", "2", "3", "4", "5"];
        var picArr = ["./gas-pump-solid.svg", "./hotel-solid.svg", "./utensils-solid.svg", "./hospital-symbol-solid.svg", "./police.png"];
        if (info[i].services == "") {
            document.getElementById('info-pane').innerHTML = 'No Services';
            return;
        }
        for (var k = 0; k < arr.length; k++) {
            if (info[i].services.includes(arr[k])) {
                if (k == 0) {
                    document.getElementById('info-pane').innerHTML = "";
                }
                assist(picArr[k]);
            }
        }
    }).on('mouseout', mouseOut).addTo(target);
}
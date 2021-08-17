function myFunction(id) {
    if (id == "myDropdown") {
        document.getElementById('myDropdown').classList.toggle("hide");
    } else {
        document.getElementById('legends').classList.toggle("hide");
        document.getElementById("openbtn").classList.toggle("hide");
        document.getElementById("closebtn").classList.toggle("hide");
    }

}

/*window.onclick = function(event) {
    if (!event.target.matches('.fas') && !event.target.matches('.detailSheets') && !event.target.matches('#layers')) {
        if (!document.getElementById("myDropdown").classList.contains('hide')) {
            document.getElementById("myDropdown").classList.toggle("hide");
        }
    }
}*/

function setLayerHelper(id) {
    setLayer(id);
    if (document.getElementById(id).checked == true) {
        document.getElementById(id).checked = false;
    } else {
        document.getElementById(id).checked = true;
    }
}

function removePOI() {
    if (document.getElementById("poiA").checked == true) {
        setLayerHelper("poiA");
    }
}

function toSub(id) {
    var idArr = ["airportYukon", "airportNU", "airportNWT", "healthcareNU", "portCommNWT"];
    if (id == "airport") {
        removePOI();
        for (var i = 0; i < 3; i++) {
            setLayerHelper(idArr[i]);
        }
    } else if (id == "healthcare") {
        removePOI();
        setLayerHelper(idArr[3]);
    } else if (id == "communities") {
        removePOI();
        setLayerHelper(idArr[4]);
    } else if (id == "poi") {
        for (var i = 0; i < idArr.length; i++) {
            if (document.getElementById(idArr[i]).checked == true) {
                setLayerHelper(idArr[i]);
            }
        }
        setLayerHelper("poiA");
    } else if (id == "data") {
        setLayerHelper("real_time_data");
    }
    document.getElementById("surface").classList.toggle("hide");
    document.getElementById(id).classList.toggle("hide");
}

function surfaceToggle() {
    var arr = ['basemap', 'road', 'other_trail', 'data', 'airport', 'healthcare', 'communities', 'poi', 'boundaries'];
    for (var i = 0; i < arr.length; i++) {
        if (!document.getElementById(arr[i]).classList.contains("hide")) {
            document.getElementById(arr[i]).classList.toggle("hide");
        }
    }
    document.getElementById("surface").classList.toggle("hide");
}

function hideId(id) {
    document.getElementById(id).classList.toggle("hide");
}
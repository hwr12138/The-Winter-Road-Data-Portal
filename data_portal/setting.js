function select(option) {
    var arr = ["airportYukon", "airportNWT", "airportNU", "healthcareNU", "portCommNWT", "poiA"];
    for (var i = 0; i < arr.length; i++) {
        if (!document.getElementById(arr[i]).classList.contains("hide")) {
            document.getElementById(arr[i] + "DL").classList.toggle("hide");
            document.getElementById(arr[i]).classList.toggle("hide");
        }
    }
    document.getElementById(option + "DL").classList.toggle("hide");
    document.getElementById(option).classList.toggle("hide");
}

// init select option to Airport_YT
var checkboxes = document.getElementsByTagName('option');
for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].selected != 'selected') {
        checkboxes[i].selected = false;
    }
}

document
    .querySelector('#selectBar')
    .addEventListener('change', function(e) {
        var option = e.target.value;
        select(option);
    });
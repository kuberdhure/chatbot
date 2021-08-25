
// var result = document.getElementById("json-result");
const Http = new XMLHttpRequest();
function getLocation() {
    console.log("getLocation Called");
    var api = "http://nominatim.openstreetmap.org/reverse?format=json"

    navigator.geolocation.getCurrentPosition(
        (position) => {
            api = api
                + "&lat=" + position.coords.latitude
                + "&lon=" + position.coords.longitude
                + "&zoom=18&addressdetails=1";
            getApi(api);
        },
        (err) => { getApi(api); },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
}
function getApi(api) {
    Http.open("GET", api);
    Http.send();
    Http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // console.log(this.responseText);
            var locationData = this.responseText;
            console.log(locationData);
        }
    };
}

export default getLocation

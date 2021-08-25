// import getLocation from "./address";
import getLocation from "./address";

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

const success = (pos) => {

    var crd, lat, long

    crd = pos.coords;
    lat = crd.latitude;
    long = crd.longitude;

    console.log(lat);
    console.log(long);
}

const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}


const GeoLocation = () => {
    if (navigator.geolocation) {
        navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
                if (result.state === "granted") {
                    console.log(result.state);
                    //If granted then you can directly call your function here
                    getLocation();
                } else if (result.state === "prompt") {
                    alert("Allow location access")
                    navigator.geolocation.getCurrentPosition(success, errors, options);
                } else if (result.state === "denied") {
                    alert("Allow location access")
                    //If denied then you have to show instructions to enable location
                }
                result.onchange = function () {
                    console.log(result.state);
                };
            });
    }
    else {
        alert("Sorry Not available!");
    }
}


export default GeoLocation;


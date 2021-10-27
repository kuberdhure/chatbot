// import getLocation from "./address";
import getLocation from "./address";

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}


const GeoLocation = async () => {
    if (navigator.geolocation) {
        const result = await navigator.permissions.query({ name: "geolocation" });
        
        if (result.state === "granted") {
            //If granted then you can directly call your function here
            await getLocation();
        } else if (result.state === "prompt") {
            alert("Allow location access")
            navigator.geolocation.getCurrentPosition(getLocation, errors, options);
        } else if (result.state === "denied") {
            alert("Allow location access")
            //If denied then you have to show instructions to enable location
        } else {
            alert("DANGER :-(");
        }

        result.onchange = function () {
            console.log(result.state);
        };
    }
    else {
        alert("Sorry Not available!");
    }
}


export default GeoLocation;


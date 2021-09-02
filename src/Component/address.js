import axios from "axios";
import { typeOfHelp } from "../chatbot/ActionProvider";


var api;

function getLocation() {
  console.log("getLocation Called");
  api = "http://nominatim.openstreetmap.org/reverse?format=json";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      api =
        api +
        "&lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude +
        "&zoom=18&addressdetails=1";
      getApi();
    },
    (err) => {
      getApi();
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}

const getApi = async () => {
  const location = await axios.get(api);
  const locationData = location.data;
  console.log(locationData);
  // var d = new Date();
  const data = {
    typeOfHelp: typeOfHelp ,
    state: locationData.address.state,
    city: locationData.address.city,
    pincode: locationData.address.postcode,
    address: locationData.display_name,
    latitude: locationData.lat,
    longitude: locationData.lon,
    isOther: false
  };
  // console.log(data);
  axios.post("http://localhost:3001/abc",data).then((res)=>{
    console.log("Yoooooooooo")
  })
};

export default getLocation;

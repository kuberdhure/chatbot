import axios from "axios";
import { typeOfHelp, chatbotData } from "../chatbot/ActionProvider";

var api;

function getLocation() {
  api = "http://nominatim.openstreetmap.org/reverse?format=json";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      api =
        api +
        "&lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude;
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
  chatbotData.post("/chatbot/distressed",data)
};

export default getLocation;

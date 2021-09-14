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
    UserId:1,
    Name:"Vinay",
    PhoneNumber:9979583723,
    Age:21,
    HelpTypeId: 1,
    // state: locationData.address.state,
    // city: locationData.address.city,
    // pincode: locationData.address.postcode,
    Address: locationData.display_name,
    Lat:  parseFloat(locationData.lat) ,
    Lng:  parseFloat(locationData.lon),
    // isOther: false
    
  };
  console.log(data);
  chatbotData.post("/data/caseData",data)
};

export default getLocation;

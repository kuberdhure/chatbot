import axios from "axios";
import {chatbotData, typeOfHelp } from "../chatbot/ActionProvider";
import { sessionId } from "../App";
var api;
var caseId 

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
    UserId:window.user.Id,
    Name:window.user.Name,
    PhoneNumber:window.user.PhoneNumber,
    Age:window.user.Age,
    HelpTypeId: typeOfHelp,
    Address: locationData.display_name,
    Lat:  parseFloat(locationData.lat) ,
    Lng:  parseFloat(locationData.lon),    
  };
  console.log(data);
  chatbotData.post("/data/caseData",data).then(res => {
  caseId = res.data.Id;
    // console.log(caseId);
    axios.put(`http://localhost:3001/data/chatSession/${sessionId}`,{CaseId:caseId});
  })
};
export { caseId };
export default getLocation;

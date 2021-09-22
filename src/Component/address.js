import axios from "axios";
import {chatbotData, typeOfHelp, userData } from "../chatbot/ActionProvider";
import { sessionId } from "../App";
var api;
var caseId 

async function getLocation() {
  api = "http://nominatim.openstreetmap.org/reverse?format=json";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      api = api + "&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
      await getApi();
      window.location.href = "/home/notification";
    },
    async (err) => {
      await getApi();
      window.location.href = "/home/notification";
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
    ...userData,
    HelpTypeId: typeOfHelp,
    Address: locationData.display_name,
    Lat:  parseFloat(locationData.lat) ,
    Lng:  parseFloat(locationData.lon),    
  };
  const res = await chatbotData.post("/data/caseData",data)
  caseId = res.data.Id;
  
  chatbotData.put(`/data/chatSession/${sessionId}`,{CaseId:caseId});
};
export { caseId };
export default getLocation;

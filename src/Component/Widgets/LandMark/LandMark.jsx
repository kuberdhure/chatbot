import React, { useState, /*useEffect,*/ useRef } from "react";
import { ConditionallyRender } from "react-util-kit";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import "./LandMark.css";
import { data} from "../../../chatbot/ActionProvider";
import { logUserChat } from "../../../utils/chatlog";

const LandMark = ({ otherAddress, setState, actionProvider }) => {
  const [displaySelector, toggleDisplaySelector] = useState(true);
  const addressInputRef = useRef();
  var address;
  var GoogleGeoApi = "https://maps.googleapis.com/maps/api/geocode/json?address="
  const GoogleApiKey = "&key=AIzaSyDnIDpwWYYJe9piJEdiNF7vqtxcAlq3Otk"
  // useEffect(() => {
  //   // console.log(selectedState);
  // }, [selectedState]);

  const handleConfirm = async () => {
    if (!(addressInputRef.current.value === "")) {
      toggleDisplaySelector((prevState) => !prevState);
      address = (addressInputRef.current.value).replaceAll(" ", "+");
      console.log(address);
      GoogleGeoApi = GoogleGeoApi + address
      try{
        const location = await axios.get(GoogleGeoApi+GoogleApiKey);
        data.Address = (location.data.results[0].formatted_address);
        data.Lat =(location.data.results[0].geometry.location.lat);
        data.Lng = (location.data.results[0].geometry.location.lng);
      }catch(error){
      }
      
      logUserChat(address);

      actionProvider.otherAddressConfirmation();
    }
  };

  return (
    <div className="address-selector-container">
      <ConditionallyRender
        ifTrue={true}
        show={
          <>
            <TextField
              label="Enter address"
              variant="filled"
              disabled = {!displaySelector}
              inputRef={addressInputRef}
            />
           
            <button 
            className="address-button-confirm" 
            onClick={ handleConfirm}
            disabled = {!displaySelector}
            >
              Confirm
            </button>
          </>
        }
        // elseShow={
        //   <>
        //     <>
        //     <TextField
        //       // defaultValue = 
        //       label = "Address"
        //       variant="filled"
        //       disabled = {!displaySelector}
        //       inputRef={addressInputRef}
        //     />
            
        //   </>
        //   </>
        // }
      />
    </div>
  );
};

export default LandMark;

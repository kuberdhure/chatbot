import React, { useState, useEffect } from "react";
import { ConditionallyRender } from "react-util-kit";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import StateNames from "./StateNames";
import MessageParser from "../../../chatbot/MessageParser";
import "./StateSelector.css";

const StateSelector = ({ selectedState, setState, actionProvider }) => {
  const [displaySelector, toggleDisplaySelector] = useState(true);

  useEffect(() => {
    console.log(selectedState);
  }, [selectedState]);

  const handleConfirm = () => {
    if(!(selectedState.name === "")){
      toggleDisplaySelector((prevState) => !prevState);
      const messPars = new MessageParser(actionProvider);
      messPars.parse(selectedState.name)
    }
  };

  const handleSubmit = (value) => {  

    if((value)){
      setState((state)=>({
        ...state,
        selectedState: value
      }))
    }

      else{
        selectedState.name = "";
        return null;
        
      }
    // }
  };

  // if (!selectedState) return null;

  return (
    <div className="state-selector-container">
      <ConditionallyRender
        ifTrue={displaySelector}
        show={
          <>
            {" "}
            {/* <h2 className="state-selector-heading">Select State</h2> */}
            {/* <div className="state-selector"> */}
            <Autocomplete
              disableClearable
              className="state-selector"
              onChange={(event, value) => handleSubmit(value)}
              style={{
                width: 200,
                paddingLeft: 13,
              }}
              options={StateNames}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  label="Select State"
                  variant="outlined"
                />
              )}
            />
            {/* </div> */}
            <button className="state-button-confirm" onClick={handleConfirm}>
              Confirm
            </button>
          </>
        }
        elseShow={
          <>
            {/* <h2 className="state-selector-heading">Select State</h2> */}
            <p>You have chosen state: {selectedState.name}</p>
        
          </>
        }
      />
    </div>
  );
};

export default StateSelector;

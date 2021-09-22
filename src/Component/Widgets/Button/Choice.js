import React, { useState } from "react";
import { ConditionallyRender } from "react-util-kit";
import { logUserChat } from "../../../utils/chatlog";
import "./Button.css";


const Choice = ({actionProvider }) => {
    const Choice = [
        {
            id: 1,
            text: "Yourself",
            handler: actionProvider.userLocation,
            
        },
        {
            id: 2,
            text: "Other",
            handler: actionProvider.otherAddress,
        }
    ]

    const [displaySelectord, toggleDisplaySelectord] = useState(true);
    const [displayDisabled, toggleDisplayDisabled] = useState(true);

    const handleSubmit = () => {
          toggleDisplaySelectord((prevState) => !prevState);
          toggleDisplayDisabled((prevState) => !prevState);
      };

    const buttons = Choice.map((item) => (
        <button
          disabled={!displayDisabled}
          key={item.id}
          onClick= {async () => {
            handleSubmit()
            await logUserChat(item.text);
            item.handler();
        }
         }
          className="option-button"
        >
          {item.text}
        </button>
      ));

    return (
        <div className="options-div">
          <ConditionallyRender
            ifTrue={!displaySelectord}
            show={<>{buttons}</>}
            elseShow={<>{buttons}</>}
          />
        </div>
      );
}



export default Choice;
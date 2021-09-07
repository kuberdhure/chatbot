import React, { /*useEffect,*/ useState } from "react";
import { ConditionallyRender } from "react-util-kit";
import "./Button.css";

const Confirmation = ({ setState, confirmationSelector, actionProvider }) => {
  const Confirmation = [
    {
      id: 1,
      text: "Yes",
      handler: actionProvider.Yes
    },
    {
        id: 2,
        text: "No",
        handler: actionProvider.No
    },
  ];

  const [displaySelectord, toggleDisplaySelectord] = useState(true);
  const [displayDisabled, toggleDisplayDisabled] = useState(true);

  const handleSubmit = () => {
   
    console.log("YEAHHHHHHHH");
      toggleDisplaySelectord((prevState) => !prevState);
      toggleDisplayDisabled((prevState) => !prevState);
  };

  // useEffect(() => {
  // }, [confirmationSelector]);

  const buttons = Confirmation.map((item) => (
    <button
      disabled={!displayDisabled}
      key={item.id}
      onClick= { () => {
        handleSubmit()
        item.handler()
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
};

export default Confirmation;

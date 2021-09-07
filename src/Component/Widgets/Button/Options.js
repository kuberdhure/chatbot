import React, { useEffect, useState } from "react";
import { ConditionallyRender } from "react-util-kit";
import "./Button.css";

const Options = ({ setState, optionSelector, actionProvider }) => {
  const options = [
    {
      id: 1,
      text: "Food",
    },
    {
      id: 2,
      text: "Clothes",
    },
    {
      id: 3,
      text: "Shelter",
    },
    {
      id: 4,
      text: "Medical",
    },
  ];

  const [displaySelector, toggleDisplaySelector] = useState(true);
  const [displayDisable, toggleDisplayDisable] = useState(true);

  const handleSubmit = (value) => {
    if (optionSelector.text === "") {
      setState((state) => ({
        ...state,
        optionSelector: value,
      }));
      actionProvider.needs(value.text);
    }
  };
  
  useEffect(()=>{
    console.log("WOWOWOWOWOW")
    toggleDisplaySelector((prevState) => !prevState);
    toggleDisplayDisable((prevState) => !prevState);
  }, [optionSelector])

  const buttons = options.map((option) => (
    <button
      disabled={displayDisable}
      key={option.id}
      onClick={() => handleSubmit(option)}
      className={"option-button"}
    >
      {option.text}
    </button>
  ));

  return (
    <div className="options-div">
      <ConditionallyRender
        ifTrue={displaySelector}
        show={<>{buttons}</>}
        elseShow={<>{buttons}</>}
      />
    </div>
  );
};

export default Options;

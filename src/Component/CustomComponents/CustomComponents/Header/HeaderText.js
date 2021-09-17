import React, { /*useEffect,*/ useState } from "react";
import { ConditionallyRender } from "react-util-kit";
import "./HeaderText.css";

const MenuButton = () => {
  const [menuChange, toggleMenuChange] = useState(true);

  const handleSubmit = () => {
    console.log("Inside the panel");
    toggleMenuChange((prevState) => !prevState);
  };

  return (
    <ConditionallyRender
      ifTrue={menuChange}
      show={
        <>
          <div className="react-chatbot-kit-chat-header">
            <p>Helper Bot</p>
            <div className="menu-icon" onClick={handleSubmit}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
        </>
      }
      elseShow={
        <>
          <div className="react-chatbot-kit-chat-header">
            <p>Helper Bot</p>
            <div className="menu-icon" onClick={handleSubmit}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
          <div className="react-chatbot-kit-menu-panel-container">
            <button className="option-menu-button">Upload Image</button>
            <button className="option-menu-button">Panic Alert</button>
            <button className="option-menu-button">End Case</button>
          </div>
        </>
      }
    />
  );
};
export default MenuButton;

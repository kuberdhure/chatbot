import React, { /*useEffect,*/ useState } from "react";
import { ConditionallyRender } from "react-util-kit";
import "./HeaderText.css";
import "../../../Container/CustomChat.css";
import "../../../Container/CustomChatbotMessage.css";
import "../../../Container/CustomUserChatMessage.css";

const MenuButton = () => {
  // const [menuChange, toggleMenuChange] = useState(true);

  const menu = document.querySelector(".menu");

  const handleSubmit = () => {
    // console.log("Inside the panel");
    // toggleMenuChange((prevState) => !prevState);
    // menu.classList.toggle('active');   //uncomment if you change ifTrue
  };

  return (
    <ConditionallyRender
      ifTrue={true}   // make it false if you want 
      show={
        <>
          <div className="react-chatbot-kit-chat-header">
            <p>Helper Bot</p>
            <button className="menu-button" onClick={handleSubmit}>
              Menu
            </button>
          </div>
        </>
      }
      elseshow={
        <>
          <div className="react-chatbot-kit-chat-header">
            <p>Helper Bot</p>
            <button className="menu-button" onClick={handleSubmit}>
              Menu
            </button>
          </div>
          <div className="menu-holder">
          <div className="menu">
            <button className="option-menu-button">Upload Image</button>
            <button className="option-menu-button">Panic Alter</button>
            <button className="option-menu-button">End Case</button>
          </div>
          </div>
        </>
      }
    />
  );
};
export default MenuButton;

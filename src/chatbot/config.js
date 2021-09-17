import { createChatBotMessage } from "react-chatbot-kit";
import React from "react";
import Choice from "../Component/Widgets/Button/Choice";
import Confirmation from "../Component/Widgets/Button/Confirmation";
import Options from "../Component/Widgets/Button/Options";
import StateSelector from "../Component/Widgets/DropDown/StateSelector";
import "../Component/CustomComponents/CustomComponents/Header/HeaderText.css"
// import MenuButton from "../Component/CustomComponents/CustomComponents/Header/HeaderText.css";
import LandMark from "../Component/Widgets/LandMark/LandMark";

const config = {
  botName: "Andy",
  initialMessages: [
          createChatBotMessage(`Hey , I am Andy your virtual assistant!`),
          createChatBotMessage(`How may I help today? here are a few things i can help you with`,
          {
            widget:"Options"
          }
          )
  ],
  state: {
    // stateNames: [],
    selectedState: {abbreviation:"", name: ""},
    otherAddress:{address:"", lat:"", long:""},
    optionSelector: {id: 0, text: ""},
    confirmationSelector: {id: 0, text: ""},
    userSelector: {id: 0, text: ""}
  },
  customComponents: {
    // header: MenuButton
  },

  widgets: [
    {
      widgetName: "StateSelector",
      widgetFunc: (props) => <StateSelector {...props} />,
      mapStateToProps: ["messages", "selectedState"],
    },
    {
      widgetName:"Options",
      widgetFunc: (props) => <Options {...props}/>,
      mapStateToProps: ["messages", "optionSelector"],
    },
    {
      widgetName: "Choice",
      widgetFunc: (props) => <Choice {...props}/>,
      mapStateToProps: ["messages", "userSelector"],
      
    },
    {
      widgetName: "Confirmation",
      widgetFunc: (props) => <Confirmation {...props}/>,
      mapStateToProps: ["messages", "confirmationSelector"],
    },
    {
      widgetName: "LandMark",
      widgetFunc: (props) => <LandMark {...props} />,
      mapStateToProps: ["messages", "otherAddress"],
    }

  ]
}

export default config
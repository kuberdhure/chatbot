import { createChatBotMessage } from "react-chatbot-kit";
import React from "react";
import Choice from "../Component/Widgets/Button/Choice";
import Confirmation from "../Component/Widgets/Button/Confirmation";
import Options from "../Component/Widgets/Button/Options";
import StateSelector from "../Component/Widgets/DropDown/StateSelector";
import MenuButton from "../Component/CustomComponents/Header/HeaderText";

const config = {
  botName: "Andy",
  initialMessages: [
    createChatBotMessage(`Hey , I am Andy your virtual assistant!`),
    createChatBotMessage(
      `How may I help today? here are a few things i can help you with`,
      {
        widget: "Options",
      }
    ),
  ],
  state: {
    selectedState: { abbreviation: "", name: "" },
    optionSelector: { id: 0, text: "" },
    confirmationSelector: { id: 0, text: "" },
    userSelector: { id: 0, text: "" },
  },
  customComponents: {
    header: MenuButton,
  },
  widgets: [
    {
      widgetName: "StateSelector",
      widgetFunc: (props) => <StateSelector {...props} />,
      mapStateToProps: ["messages", "selectedState"],
    },
    {
      widgetName: "Options",
      widgetFunc: (props) => <Options {...props} />,
      mapStateToProps: ["messages", "optionSelector"],
    },
    {
      widgetName: "Choice",
      widgetFunc: (props) => <Choice {...props} />,
      mapStateToProps: ["messages", "userSelector"],
    },
    {
      widgetName: "Confirmation",
      widgetFunc: (props) => <Confirmation {...props} />,
      mapStateToProps: ["messages", "confirmationSelector"],
    },
  ],
};

export default config;

import { createChatBotMessage } from "react-chatbot-kit";
import React from "react";
import Options from "../Component/Options"; 
import Choice from "../Component/Choice";
import Confirmation from "../Component/Confirmation";

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
  widgets: [
    {
      widgetName:"Options",
      widgetFunc: (props) => <Options {...props}/>,
    },
    {
      widgetName: "Choice",
      widgetFunc: (props) => <Choice {...props}/>,

    },
    {
      widgetName: "Confirmation",
      widgetFunc: (props) => <Confirmation {...props}/>,
    }

  ]
}

export default config
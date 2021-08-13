import { createChatBotMessage } from "react-chatbot-kit";
import React from "react";
import Options from "../Component/Options"; 

const config = {
  botname: "Andy",
  initialMessages: [
          createChatBotMessage(`Hey , I am Andy your virtual assistant!`),
          createChatBotMessage(`How may I help today? here are few things i can help with`,
          {
            widget:"Options"
          }
          )
  ],
  widgets: [
    {
      widgetName:"Options",
      widgetFunc: (props) => <Options {...props}/>,
    }
  ],
}

export default config
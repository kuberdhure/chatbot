import './App.css';
import React from "react";
import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config"
import MessageParser from "./chatbot/MessageParser"
import ActionProvider from "./chatbot/ActionProvider"

import"./Container/CustomChat.css"
import "./Container/CustomChatbotMessage.css";
import "./Container/CustomUserChatMessage.css";

function App() {

  return (
     <div className="App">
        <Chatbot 
          className="Chat"
          config={config} 
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          />
     </div>
  );
}

export default App;

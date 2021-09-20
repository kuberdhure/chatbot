import './App.css';
import React, {useEffect} from "react";
import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config"
import MessageParser from "./chatbot/MessageParser"
import ActionProvider, { chatbotData } from "./chatbot/ActionProvider"

import"./Container/CustomChat.css"
import "./Container/CustomChatbotMessage.css";
import "./Container/CustomUserChatMessage.css";

var sessionId;

function App() { 
  useEffect(() => {
    chatbotData.post(`/data/chatSession`,{UserId: 1}).then(res =>{
     sessionId = res.data.Id;
    })
  });

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
export { sessionId };

export default App;

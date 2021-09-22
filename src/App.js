import './App.css';
import React, {useEffect, useState} from "react";
import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config"
import MessageParser from "./chatbot/MessageParser"
import ActionProvider, { chatbotData, userData } from "./chatbot/ActionProvider"

import"./Container/CustomChat.css"
import "./Container/CustomChatbotMessage.css";
import "./Container/CustomUserChatMessage.css";
import { logBotChat } from './utils/chatlog';

var sessionId;

function App() { 
  const [isSessionIdGenerated, setIsSessionIdGenerated] = useState(false);

  useEffect(async () => {
    const res = await chatbotData.post(`/data/chatSession`,{UserId: userData.UserId})
    sessionId = res.data.Id;
    for(const {message} of config.initialMessages) {
      await logBotChat(message);
    }
    setIsSessionIdGenerated(true);
  });

  return (
     
     <div className="App">
       {(() => {
         if(isSessionIdGenerated) {
           return (
             <Chatbot 
               className="Chat"
               config={config} 
               messageParser={MessageParser}
               actionProvider={ActionProvider}
               />
           );
         } else {
           return (
              <h3>Loading...</h3>
           );
         }
       })()}
     </div>
  );
}
export { sessionId };

export default App;

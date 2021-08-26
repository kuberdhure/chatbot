import './App.css';
import React from "react";
import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config"
import MessageParser from "./chatbot/MessageParser"
import ActionProvider from "./chatbot/ActionProvider"

function App() {
  return (
     <div className="App">
        <Chatbot 
          className="Chat"
          config={config} 
          headerText="Helper Bot"
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          />
     </div>
  );
}

export default App;

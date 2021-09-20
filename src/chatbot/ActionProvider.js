import GeoLocation from "../Component/GeoLocation";
import config from "./config";
import axios from "axios";
import { sessionId } from "../App";

var caseId; 
var typeOfHelp;
var message = {
  message : "How may I help today? here are a few things i can help you with"
};


const data = {
  UserId: window.user.Id,
  Name: window.user.Name,
  PhoneNumber: window.user.PhoneNumber,
  Age: window.user.Age,
  HelpTypeId: 0,
  Address: "",
  Lat: 0,
  Lng: 0,  
  IsOther: true,
};

const chatlog = {
  SessionId: 0,
  BotResponse: "",
  UserRequest: ""
}


const chatbotData = axios.create({ baseURL: "http://localhost:3001"});


class ActionProvider {
  
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  chatLog = async (msgText) => {
    chatlog.SessionId = sessionId;
    chatlog.UserRequest = msgText;
    chatlog.BotResponse = message.message;
    console.log(chatlog);
    const res = await chatbotData.post("/data/chatLog",chatlog);
    return res;
  };


  initialMessage = () => {
    this.addMessageToState(config.initialMessages[1]);
  };

  volunteerTime = () => {
    message = this.createChatBotMessage(
      "A volunteer will be with you in 15-30 minutes"
    );

    this.addMessageToState(message);
  };

  sayTime = () => {
    var d = new Date();
    var T = d.toLocaleTimeString();

    message = this.createChatBotMessage(
      "The current ist time is " + T.toString()
    );
    this.addMessageToState(message);
  };

  greet = () => {
    message = this.createChatBotMessage("Hey there :)");
    this.addMessageToState(message);
  };

  welcome = () => {
    message = this.createChatBotMessage("I'm glad i could help you! :) ");
    this.addMessageToState(message);
  };

 needs = (need) => {
    this.chatLog(need);
    message = this.createChatBotMessage("You need " + need);

     chatbotData.get(`/data/helpType/${need}`).then(res =>{
      data.HelpTypeId = res.data.helpType[0].Id;
      typeOfHelp = res.data.helpType[0].Id;
     console.log(typeOfHelp);
    });

    this.addMessageToState(message);
    this.location();
  };


  location = () => {
    message = this.createChatBotMessage("Whom this help is for?", {
      widget: "Choice",
    });

    this.addMessageToState(message);
  };
  
  userLocation = async () => {
    await this.chatLog("Yourself");
    GeoLocation();
  };

  otherAddress = () => {
    message = this.createChatBotMessage("Try entering your complete address with pincode and nearest landmark: ", 
     {
       widget:"LandMark"
     }
    )
    this.addMessageToState(message);
   }
  
  otherAddressConfirmation = () =>{
    message = this.createChatBotMessage("Is this your location:  "+ data.Address , {
      widget:"Confirmation"
    })
   this.addMessageToState(message)
  }
  
  Yes = async () => {
    this.chatLog("Yes");
    // chatbotData.post("/data/caseData",data).then(res => {
    // caseId = res.data.Id;
    // chatbotData.put(`/data/chatSession/${sessionId}`,{CaseId:caseId});
    // })

    const res = await chatbotData.post("/data/caseData",data)
    caseId = res.data.Id;
    await chatbotData.put(`/data/chatSession/${sessionId}`,{CaseId:caseId});

    window.location.href = "/home/notification";
  };

  No = () => {
    this.chatLog("No");
    this.otherAddress();
  };

  otherPhoneNumber = () => {
    message = this.createChatBotMessage("Pls enter your phone number");
    this.addMessageToState(message);
  };


  invalidInput = () => {
    message = this.createChatBotMessage(
      "Sorry, I didn't understand :(  I can help you with following things",
      {
        widget: "Options",
      }
    );

    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}



export { typeOfHelp, chatbotData, data };
export default ActionProvider;

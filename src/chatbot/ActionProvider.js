import GeoLocation from "../Component/GeoLocation";
import config from "./config";
import axios from "axios";

/**
 * @type {"" |"state" | "city" | "pincode" | "location"}
 */
var userLocationStatus = "";
// var scpa;
var typeOfHelp = null;

var message = {  // object to be sent into chatlogs table
  id: 101,
  message: "How may I help today? here are a few things i can help you with"
};

const data = {
  typeOfHelp: "",
  state: "",
  city: "",
  pincode: "",
  address: "",
  latitude: null,
  longitude: null,
  isOther: true,
};

const chatlog = {
  userId: 0,
  chatbotResponse: "",
  msgText: ""
}

var otherAddressData = {
  address : "",
  lat: "",
  long: ""
}

const chatbotData = axios.create({ baseURL: "http://localhost:3001" });

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  chatLog = (msgText) => {
    chatlog.userId = 102;
    chatlog.msgText = msgText;
    chatlog.chatbotResponse = message.message;
    console.log(chatlog);
    chatbotData.post("/chatbot/chatlog", chatlog).then((res) => {
      // console.log(res);
    });
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
    data.typeOfHelp = need;
    typeOfHelp = need;
    message = this.createChatBotMessage("You need " + need);
    this.addMessageToState(message);
    this.location();
  };


  location = () => {
    message = this.createChatBotMessage("Whom this help is for?", {
      widget: "Choice",
    });

    this.addMessageToState(message);
  };

  userLocation = () => {
    this.chatLog("Yourself");
    GeoLocation();
    this.volunteerTime()
  };

  // otherState = (fromNo) => {
  //   if (fromNo !== 1) {
  //     this.chatLog("other");
  //   }
  //   userLocationStatus = "state";
  //   message = this.createChatBotMessage("Enter State Name:  ", {
  //     widget: "StateSelector"
  //   });
  //   this.addMessageToState(message);
  //   console.log(userLocationStatus);
  // };

  // otherCity = () => {
  //   message = this.createChatBotMessage("Enter City Name:  ");
  //   this.addMessageToState(message);
  //   console.log(userLocationStatus);
  // };

  // otherPincode = () => {
  //   message = this.createChatBotMessage("Enter Pincode:  ");
  //   this.addMessageToState(message);
  //   console.log(userLocationStatus);
  // };

  otherAddress = () => {
   message = this.createChatBotMessage("Enter your precise location : ", 
    {
      widget:"LandMark"
    }
   )
   this.addMessageToState(message);
  }

  otherAddressConfirmation = () =>{
    console.log(otherAddressData);
    message = this.createChatBotMessage("Is this your location:  "+ otherAddressData.address , {
      widget:"Confirmation"
    })
   this.addMessageToState(message)
  }

  // locationConfirmation = (lowerMsg) => {
  //   message = this.createChatBotMessage(
  //     "Did you enter your answer correctly? ",
  //     {
  //       widget: "Confirmation",
  //     }
  //   );
  //   scpa = lowerMsg;
  //   this.addMessageToState(message);
  // };

  Yes = () => {
    this.chatLog("Yes");
    this.volunteerTime();
    // if (userLocationStatus === "state") {
    //   data.state = scpa;
    //   userLocationStatus = "city";
    //   this.otherCity();
    // }

    // else if (userLocationStatus === "city") {
    //   data.city = scpa;
    //   userLocationStatus = "pincode";
    //   this.otherPincode();
    // }

    // else if (userLocationStatus === "pincode") {
    //   data.pincode = scpa;
    //   userLocationStatus = "address";
    //   this.otherLocation();
    // }

    // else if (userLocationStatus === "address") {
    //   data.address = scpa;
    //   userLocationStatus = "";
    //   chatbotData.post("/chatbot/distressed", data).then((res) => {
    //     // console.log(res);
    //   });

    //   this.volunteerTime();
    // }
  };

  No = () => {
    this.chatLog("No");
    this.otherAddress();
    // if (userLocationStatus === "state") {
    //   this.otherState(1);
    // } else if (userLocationStatus === "city") {
    //   this.otherCity();
    // } else if (userLocationStatus === "pincode") {
    //   this.otherPincode();
    // } else if (userLocationStatus === "address") {
    //   this.otherLocation();
    // }
  };

  otherLocation = () => {
    message = this.createChatBotMessage(
      "Enter your precise location (this will be sent to the volunteer) "
    );
    console.log(userLocationStatus);
    this.addMessageToState(message);
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



export { userLocationStatus, typeOfHelp, chatbotData, otherAddressData };
export default ActionProvider;

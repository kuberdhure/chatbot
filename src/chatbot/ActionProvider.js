import GeoLocation from "../Component/GeoLocation";
import config from "./config";
import axios from "axios";

/**
 * @type {"" |"state" | "city" | "pincode" | "location"}
 */
var userLocationStatus = "";
var scpa;
var typeOfHelp = null;
var message = {
  id:101,
  message : "How may I help today? here are a few things i can help you with"
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
const chatbotData = axios.create({ baseURL: "http://localhost:3001"});

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
    chatbotData.post("/chatbot/chatlog",chatlog).then((res) => {
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
    data.typeOfHelp = need;
    typeOfHelp = need;
    message = this.createChatBotMessage("You need " + need);
    this.addMessageToState(message);
    this.location();
  };

  food = () => {
    this.chatLog("food");
    data.typeOfHelp = "food";
    typeOfHelp = "food";
    message = this.createChatBotMessage(
      "Okay we understand you need food"
    );

    this.addMessageToState(message);
    this.location();
  };

  shelter = () => {
    this.chatLog("shelter");
    data.typeOfHelp = "shelter";
    typeOfHelp = "shelter";
    message = this.createChatBotMessage(
      "Okay we understand you need shelter"
    );
    this.addMessageToState(message);
    this.location();
  };

  clothes = () => {
    this.chatLog("clothes");
    data.typeOfHelp = "clothes";
    typeOfHelp = "clothes";
    message = this.createChatBotMessage(
      "Okay we understand you need clothes"
    );
    this.addMessageToState(message);
    this.location();
  };

  medical = () => {
    this.chatLog("medical");
    data.typeOfHelp = "medical";
    typeOfHelp = "medical";
    message = this.createChatBotMessage(
      "Okay we understand you need medical help "
    );
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

  otherState = () => {
    this.chatLog("other");
    userLocationStatus = "state";
    message = this.createChatBotMessage("Enter State Name:  ");
    this.addMessageToState(message);
    console.log(userLocationStatus);
  };

  otherCity = () => {
    message = this.createChatBotMessage("Enter City Name:  ");
    this.addMessageToState(message);
    console.log(userLocationStatus);
  };

  otherPincode = () => {
    message = this.createChatBotMessage("Enter Pincode:  ");
    this.addMessageToState(message);
    console.log(userLocationStatus);
  };

  locationConfirmation = (lowerMsg) => {
    message = this.createChatBotMessage(
      "Did you enter your answer correctly? ",
      {
        widget: "Confirmation",
      }
    );
    scpa = lowerMsg;
    this.addMessageToState(message);
  };

  Yes = () => {
    this.chatLog("Yes");
    if (userLocationStatus === "state") {
      data.state = scpa;
      userLocationStatus = "city";
      this.otherCity();
    }

    else if (userLocationStatus === "city") {
      data.city = scpa;
      userLocationStatus = "pincode";
      this.otherPincode();
    }

    else if (userLocationStatus === "pincode") {
      data.pincode = scpa;
      userLocationStatus = "address";
      this.otherLocation();
    }

    else if (userLocationStatus === "address") {
      data.address = scpa;
      userLocationStatus = "";
      chatbotData.post("/chatbot/distressed", data).then((res) => {
        // console.log(res);
      });

      this.volunteerTime();
    }
  };

  No = () => {
    this.chatLog("No");
    if (userLocationStatus === "state") {
      this.otherState();
    } else if (userLocationStatus === "city") {
      this.otherCity();
    } else if (userLocationStatus === "pincode") {
      this.otherPincode();
    } else if (userLocationStatus === "address") {
      this.otherLocation();
    }
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



export { userLocationStatus, typeOfHelp, chatbotData };
export default ActionProvider;

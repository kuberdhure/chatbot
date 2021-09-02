import GeoLocation from "../Component/GeoLocation";
import config from "./config";
import axios from "axios";

/**
 * @type {"" |"state" | "city" | "pincode" | "location"}
 */
var userLocationStatus = "";
var scpa;
var typeOfHelp;
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

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  initialMessage = () => {
    this.addMessageToState(config.initialMessages[1]);
  };

  volunteerTime = () => {
    const message = this.createChatBotMessage(
      "A volunteer will be with you in 15-30 minutes"
    );
    this.addMessageToState(message);
  };

  sayTime = () => {
    var d = new Date();
    var T = d.toLocaleTimeString();

    const message = this.createChatBotMessage(
      "The current ist time is " + T.toString()
    );
    this.addMessageToState(message);
  };

  greet = () => {
    const message = this.createChatBotMessage("Hey there :)");
    this.addMessageToState(message);
  };

  welcome = () => {
    const message = this.createChatBotMessage("I'm glad i could help you! :) ");
    this.addMessageToState(message);
  };

  needs = (need) => {
    data.typeOfHelp = need;
    typeOfHelp = need;
    const message = this.createChatBotMessage("You need " + need);
    this.addMessageToState(message);
    this.location();
  };

  food = () => {
    data.typeOfHelp = "food";
    typeOfHelp = "food";
    const message = this.createChatBotMessage(
      "Okay we understand you need food"
    );
    this.addMessageToState(message);
    this.location();
  };

  shelter = () => {
    data.typeOfHelp = "shelter";
    typeOfHelp = "shelter";
    const message = this.createChatBotMessage(
      "Okay we understand you need shelter"
    );
    this.addMessageToState(message);
    this.location();
  };

  clothes = () => {
    data.typeOfHelp = "clothes";
    typeOfHelp = "clothes";
    const message = this.createChatBotMessage(
      "Okay we understand you need clothes"
    );
    this.addMessageToState(message);
    this.location();
  };

  medical = () => {
    data.typeOfHelp = "medical";
    typeOfHelp = "medical";
    const message = this.createChatBotMessage(
      "Okay we understand you need medical help "
    );
    this.addMessageToState(message);
    this.location();
  };

  location = () => {
    const message = this.createChatBotMessage("Whom this help is for?", {
      widget: "Choice",
    });

    this.addMessageToState(message);
  };

  userLocation = () => {
    GeoLocation();
    this.volunteerTime()
  };

  otherState = () => {
    userLocationStatus = "state";
    const message = this.createChatBotMessage("Enter State Name:  ");
    this.addMessageToState(message);
    console.log(userLocationStatus);
  };

  otherCity = () => {
    // userLocationStatus = "city";
    const message = this.createChatBotMessage("Enter City Name:  ");
    this.addMessageToState(message);
    console.log(userLocationStatus);
  };

  otherPincode = () => {
    // userLocationStatus = "pincode";
    const message = this.createChatBotMessage("Enter Pincode:  ");
    this.addMessageToState(message);
    console.log(userLocationStatus);
  };

  locationConfirmation = (lowerMsg) => {
    const message = this.createChatBotMessage(
      "Did you enter your answer correctly? ",
      {
        widget: "Confirmation",
      }
    );
    scpa = lowerMsg;
    this.addMessageToState(message);
  };

  Yes = () => {
    if (userLocationStatus === "state") {
      data.state = scpa;
      userLocationStatus = "city";
      this.otherCity();
    } else if (userLocationStatus === "city") {
      data.city = scpa;
      userLocationStatus = "pincode";
      this.otherPincode();
    } else if (userLocationStatus === "pincode") {
      data.pincode = scpa;
      userLocationStatus = "address";
      this.otherLocation();
    } else if (userLocationStatus === "address") {
      data.address = scpa;
      userLocationStatus = "";
      axios.post("http://localhost:3001/abc", data).then((res) => {
        console.log("Yoooooooooo");
      });
      this.volunteerTime();
    }
  };

  No = () => {
    if (userLocationStatus === "state") {
      this.otherState();
    } else if (userLocationStatus === "city") {
      this.otherCity();
    } else if (userLocationStatus === "pincode") {
      this.otherPincode();
    } else if (userLocationStatus === "address") {
      this.otherPincode();
    }
  };

  otherLocation = () => {
    const message = this.createChatBotMessage(
      "Enter your precise location (this will be sent to the volunteer) "
    );
    console.log(userLocationStatus);
    this.addMessageToState(message);
  };

  otherPhoneNumber = () => {
    const message = this.createChatBotMessage("Pls enter your phone number");
    this.addMessageToState(message);
  };


  invalidInput = () => {
    const message = this.createChatBotMessage(
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

export { userLocationStatus, typeOfHelp };
export default ActionProvider;

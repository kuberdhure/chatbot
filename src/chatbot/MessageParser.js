import {userLocationStatus} from "./ActionProvider";

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    // console.log(message)
    console.log(userLocationStatus)
    const lowerMsg =  message.toLowerCase();

    if(lowerMsg.includes("time")){
        this.actionProvider.sayTime();
    }
    else if(lowerMsg.includes("hi") || lowerMsg.includes("hello") ){
      this.actionProvider.greet();
    }
    else if(lowerMsg.includes("yourself") || lowerMsg.includes("myself")){
      this.actionProvider.userLocation();
    }
    else if(lowerMsg.includes("thank")){
      this.actionProvider.welcome();
    }
    else if(lowerMsg.includes("food")){
      this.actionProvider.food();
    }
    else if(lowerMsg.includes("cloth")){
      this.actionProvider.cloth();
    }
    else if(lowerMsg.includes("shelter")){
      this.actionProvider.shelter();
    }
    else if(lowerMsg.includes("medical")){
      this.actionProvider.medical();
    }
    else if( userLocationStatus === "state"){
      this.actionProvider.locationConfirmation();
    }
    else if(userLocationStatus === "city"){
      this.actionProvider.locationConfirmation();
    }
    else if(userLocationStatus === "pincode"){
      this.actionProvider.locationConfirmation();
    }
    else{
      this.actionProvider.invalidInput();
    }
  }
}


export default MessageParser;
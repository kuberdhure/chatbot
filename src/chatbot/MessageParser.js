class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(message)
    const lowercase =  message.toLowerCase();

    if(lowercase.includes("time")){
        this.actionProvider.sayTime();
    }
    else if(lowercase.includes("thank")){
      this.actionProvider.welcome();
    }
    else if(lowercase.includes("food")){
      this.actionProvider.food();
    }
    else{
      this.actionProvider.invalidInput();
    }
  }
}


export default MessageParser;
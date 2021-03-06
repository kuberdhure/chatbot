import { logUserChat } from "../utils/chatlog";
import { chatbotData } from "./ActionProvider";

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    logUserChat(message);
    if(message !== ""){
    const lowerMsg = message.toLowerCase();
    this.actionProvider.chatLog(lowerMsg);
 
    chatbotData.post("/data/nlu", {"utterances": [lowerMsg]})
      .then((res) => {
        const predictions = res.data["predictions"];
        var intents = predictions[0].contexts[0].intents;
        intents.sort((a, b) => (a.confidence < b.confidence ? 1 : -1));

        var entities = predictions[0].entities[0];

          if (intents[0].confidence <= 0.02) {
            this.actionProvider.invalidInput();
          } else if (intents[0].name === "hello") {
            this.actionProvider.greet();
          } else if (intents[0].name === "need-help") {
            if (entities == null) {
              this.actionProvider.initialMessage();
            } else {
              this.actionProvider.needs(predictions[0].entities[0].value);
            }
          } else if (intents[0].name === "time") {
            this.actionProvider.volunteerTime();
          } else if (intents[0].name === "thank-you") {
            this.actionProvider.welcome();
          }
          console.log(this.state.messages);
      })
      .catch((error) => console.log(error));
    }

    else{
      this.actionProvider.invalidInput();
    }
   
  }
}

export default MessageParser;

import { userLocationStatus, chatbotData } from "./ActionProvider";

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(userLocationStatus);

    const lowerMsg = message.toLowerCase();
    this.actionProvider.chatLog(lowerMsg);

    chatbotData.post("/data/nlu", {"utterances": [lowerMsg]})
      .then((res) => {
        const predictions = res.data["predictions"];
        var intents = predictions[0].contexts[0].intents;
        intents.sort((a, b) => (a.confidence < b.confidence ? 1 : -1));

        var entities = predictions[0].entities[0];

        // var need;

        // if(predictions[0].entities[0].value == "food"){
        //   need = 1;
        // }else if(predictions[0].entities[0].value == "clothes"){
        //   need = 2;
        // }else if(predictions[0].entities[0].value == "shelter"){
        //   need = 3;
        // }else if(predictions[0].entities[0].value == "medical"){
        //   need = 4;
        // }

        if (userLocationStatus === "") {
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
        } else if (
          userLocationStatus === "state" ||
          userLocationStatus === "city" ||
          userLocationStatus === "pincode" ||
          userLocationStatus === "address"
        ) {
          this.actionProvider.locationConfirmation(lowerMsg);
        } else {
          this.actionProvider.invalidInput();
        }
      })
      .catch((error) => console.log(error));
  }
}

export default MessageParser;

import { userLocationStatus } from "./ActionProvider";
import axios from "axios";

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(userLocationStatus);

    const lowerMsg = message.toLowerCase();

    axios.post("http://localhost:3001/nlu/predict", {"utterances": [lowerMsg]})
      .then((res) => {
        console.log(res);
        const predictions = res.data["predictions"];
        var intents = predictions[0].contexts[0].intents;
        intents.sort((a, b) => (a.confidence < b.confidence ? 1 : -1));

        var entities = predictions[0].entities[0];

        console.log(intents[0].confidence);

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

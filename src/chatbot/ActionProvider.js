import GeoLocation from "../Component/GeoLocation";
import config from "./config";

/**
 * @type {"" |"state" | "city" | "pincode" | "location"}
 */
var userLocationStatus = "";

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;

    }

    initialMessage = () => {
        this.addMessageToState(config.initialMessages[1])
    } 

    volunteerTime = () => {
        const message = this.createChatBotMessage("A volunteer will be with you in 15-30 minutes")
        this.addMessageToState(message)
    }

    sayTime = () => {
        var d = new Date();
        var T = d.toLocaleTimeString();

        const message = this.createChatBotMessage("The current ist time is " + T.toString())
        this.addMessageToState(message)
    }

    greet = () => {
        const message = this.createChatBotMessage("Hey there :)");
        this.addMessageToState(message)
    }

    welcome = () => {

        const message = this.createChatBotMessage("I'm glad i could help you! :) ")
        this.addMessageToState(message)
    }


    needs = (need) => {
        const message = this.createChatBotMessage("You need " + need)
        this.addMessageToState(message)
        this.location()
    }

    food = () => {
        const message = this.createChatBotMessage("Okay we understand you need food")
        this.addMessageToState(message)
        this.location()
    }

    shelter = () => {
        const message = this.createChatBotMessage("Okay we understand you need shelter")
        this.addMessageToState(message)
        this.location()
    }

    clothes = () => {
        const message = this.createChatBotMessage("Okay we understand you need clothes")
        this.addMessageToState(message)
        this.location()
    }

    medical = () => {
        const message = this.createChatBotMessage("Okay we understand you need medical help ")
        this.addMessageToState(message)
        this.location()
    }



    location = () => {
        const message = this.createChatBotMessage("Whom this help is for?", {
            widget: "Choice"
        });

        this.addMessageToState(message);
    }

    userLocation = () => {

        GeoLocation();
        this.volunteerTime();

    }

    otherState = () => {

        userLocationStatus = "state";
        const message = this.createChatBotMessage("Enter State Name:  ")
        this.addMessageToState(message)
        console.log(userLocationStatus);

    }


    otherCity = () => {

        // userLocationStatus = "city";
        const message = this.createChatBotMessage("Enter City Name:  ")
        this.addMessageToState(message)
        console.log(userLocationStatus);

    }

    otherPincode = () => {

        // userLocationStatus = "pincode";
        const message = this.createChatBotMessage("Enter Pincode:  ")
        this.addMessageToState(message)
        console.log(userLocationStatus);

    }

    locationConfirmation = () => {
        const message = this.createChatBotMessage("Did you enter your answer correctly? ", {
            widget: "Confirmation"
        })

        this.addMessageToState(message)
    }


    Yes = () => {

        if (userLocationStatus === "state") {
            userLocationStatus = "city";
            this.otherCity()
        }
        else if (userLocationStatus === "city") {
            userLocationStatus = "pincode";
            this.otherPincode()
        }
        else if (userLocationStatus === "pincode") {
            userLocationStatus = "location";
            this.otherLocation()
        } 
        else if (userLocationStatus === "location") {
            userLocationStatus = "";
        }
    }

    No = () => {

        if (userLocationStatus === "state") {
            this.otherState()
        }
        else if (userLocationStatus === "city") {
            this.otherCity()
        }
        else if (userLocationStatus === "pincode") {
            this.otherPincode()
        }
        else if (userLocationStatus === "location") {
        }
    }

    otherLocation = () =>{
        const message = this.createChatBotMessage("Enter your precise location (this will be sent to the volunteer) ")
        console.log(userLocationStatus)
        this.addMessageToState(message)
    }



    invalidInput = () => {
        const message = this.createChatBotMessage("Sorry, I didn't understand :(  I can help you with following things", {
            widget: "Options"
        })

        this.addMessageToState(message)
    }



    addMessageToState = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }))
    }

}


export { userLocationStatus };
export default ActionProvider;

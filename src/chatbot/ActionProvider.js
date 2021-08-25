import GeoLocation from "../Component/GeoLocation";

var userLocationStatus = "";

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;

    }


    sayTime = () => {
        var d = new Date();
        var T = d.toLocaleTimeString();

        const message = this.createChatBotMessage("The current ist time is " + T.toString())
        this.addMessageToState(message)
    }

    greet = () => {
        const message = this.createChatBotMessage("Hello friend :)");
        this.addMessageToState(message)
    }

    welcome = () => {

        const message = this.createChatBotMessage("i'm glad i could help you! :) ")
        this.addMessageToState(message)
    }

    food = () => {

        const message = this.createChatBotMessage("Okay we understand you need food ")
        this.addMessageToState(message)
        this.location()

    }
    shelter = () => {
        const message = this.createChatBotMessage("Okay we understand you need shelter")
        this.addMessageToState(message)
        this.location()
    }
    cloth = () => {
        const message = this.createChatBotMessage("Okay we understand you need cloth")
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
        const message = this.createChatBotMessage("Enter Pincode :  ")
        this.addMessageToState(message)
        console.log(userLocationStatus);

    }

    locationConfirmation = () => {
        const message = this.createChatBotMessage("Did you entered your choice correctly ? ", {
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
            userLocationStatus = "";
            this.otherLocation()
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
    }

    otherLocation = () =>{
        const message = this.createChatBotMessage("Enter the complete location or Google Maps link (this will be sent to the volunteer) ")
        this.addMessageToState(message)
    }



    invalidInput = () => {
        const message = this.createChatBotMessage("Sorry I didn't understood :(  I can help you with following things", {
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

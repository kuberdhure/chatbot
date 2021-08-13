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
  
  welcome = () =>{
    const message = this.createChatBotMessage("i'm glad i could help you! :) ")
    this.addMessageToState(message)
  }

  food = () => {
    const message = this.createChatBotMessage("Ok ! There are few volunteers nearby who help with food , I will create a alert to them")
    this.addMessageToState(message)
  }
  shelter = () => {
    const message = this.createChatBotMessage("Ok ! There are few relief shelters nearby, Here are the locations...")
    this.addMessageToState(message)
  }
  cloth = () => {
    const message = this.createChatBotMessage("Ok ! There are few volunteers nearby who help with clothes , I will create a alert to them")
    this.addMessageToState(message)
  }

  medical = () => {
    const message = this.createChatBotMessage("Ok ! There are few volunteers nearby who help with first aid,etc, I will create a alert to them. Also Here are list of hospitals nearby with their contact info. .... ")
    this.addMessageToState(message)
  }
  invalidInput = () => {
    const message = this.createChatBotMessage("Sorry I didn't Understand! Please Try again with these options.", {
      widget:"Options"
    })
    this.addMessageToState(message)
  }
  addMessageToState = (message) =>{
    this.setState((prevState)=>({
      ...prevState,
      messages: [...prevState.messages,message],
    }))
  }
}



export default ActionProvider;

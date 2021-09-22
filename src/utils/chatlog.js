import { sessionId } from "../App";
import { chatbotData } from "../chatbot/ActionProvider";

export async function logChat(msg, sender) {
    const reqBody = {
        SessionId: sessionId,
        Message: msg,
        Sender: sender,
    };
    console.log(reqBody);
    const res = await chatbotData.post("/data/chatLog", reqBody);
    return res;
}

export async function logUserChat(msgText) {
    return await logChat(msgText, "user");
};

export async function logBotChat(msgText) {
    return await logChat(msgText, "bot");
};
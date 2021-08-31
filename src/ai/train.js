import * as nlu from "./nlu.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const delay = ms => new Promise(res => setTimeout(res, ms));
const logLine = () => console.log("_".repeat(50));

// const trainData = require("./train_data.json");
// const utterances = require("./sample_utterences.json")["utterances"];


async function main() {
    try {
        logLine();

        const info = await nlu.info();
        // console.log(JSON.stringify(info, undefined, 2));
        console.log(`Version: ${info.version}`);
        
        logLine();
        
        const modelId = "bb53a74fd26e1563.46a8c78ff3b996ce.42.en";
        // const modelId = await nlu.train(trainData);
        // console.log(`Model ID: ${modelId}`);

        
        
        var isDone = false;
        while(!isDone) {
            const session = await nlu.progress(modelId);
            console.log(`Status: ${session.status}`);
            console.log(`Progress: ${session.progress}`);
            
            logLine();
            
            isDone = session.status == "done";

            if(session.status == "canceled" || session.status == "errored") {
                throw "Training Failed";
            }

            await delay(1000); // 1s
        }
        
        const models = await nlu.list();
        console.log(`Models: [${models.join(",")}]`);
        
        logLine();
        
        // const predictions = await nlu.predict(modelId, utterances);
        // console.log(JSON.stringify(predictions, undefined, 2));


        // var intents = predictions[0].contexts[0].intents;
        // intents.sort((a, b) => a.confidence < b.confidence ? 1 : -1)
        // console.log(intents)

        // var entities = predictions[0].entities[0]

        // if (entities == null) {
        //     return null    
        // } else{
        //     var value = predictions[0].entities[0].value
        //     console.log(value)
        // }
        
        
                logLine();
    } catch(error) {
        console.log(error);
    }
}

main();

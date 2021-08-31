import axios from "axios";

const BASE_URL = "http://localhost:3200";
const INFO_URL = "/v1/info";
const TRAIN_URL = "/v1/train";
const PREDICT_URL = "/v1/predict";
const MODELS_URL = "/v1/models";

const axiosInstance = axios.create({ baseURL: BASE_URL, timeout: 10000});


/**
 * Gets the current version of botpress core NLU. Usefull to test if your installation is working.
 * @returns {{
 *  version: string
 *  health: {
 *    isEnabled: boolean
 *    validProvidersCount: number
 *    validLanguages: Array<string>
 *  }
 *  languages: Array<string>
 *  specs: {
 *    nluVersion: string
 *    languageServer: {
 *      dimensions: number
 *      domain: string
 *      version: string
 *    }
 *  }
 * }} info: version, health and supported languages.
 */
export async function info() {
    const req = axiosInstance.get(INFO_URL);
    const res = await req;
    return res.data["info"];
}

/**
 * Starts a training.
 * @param {{
 *  language: string
 *  intents: Array<{
 *    name: string
 *    contexts: Array<string>
 *    utterances: Array<string>
 *    slots: {
 *      name: string
 *      entities: Array<string>
 *    }
 *  }>
 *  contexts: Array<string>
 *  entities: Array<{
 *    name: string
 *    type: string
 *    fuzzy: number
 *    values: Array<{
 *      name: string
 *      synonyms: Array<string>
 *    }>
 *  }>
 *  seed?: number
 * }} trainData
 * @returns {number} modelId A model id for futur API calls
 */
export async function train(trainData) {
    const req = axiosInstance.post(TRAIN_URL, trainData);
    const res = await req;
    return res.data["modelId"];
}

/**
 * Gets a training progress status.
 * @returns {{
 *  progress: number
 *  status: "idle" | "done" | "needs-training" | "training-pending" | "training" | "canceled" | "errored" | null
 * }} session A training session data structure with information on desired model.
 */
export async function progress(modelId) {
    const req = axiosInstance.get(`${TRAIN_URL}/${modelId}`);
    const res = await req;
    return res.data["session"];
}

/**
 * List all models for a given app Id and secret.
 * @returns {Array<string>} models Array of strings model ids available for prediction.
 */
export async function list() {
    const req = axiosInstance.get(MODELS_URL);
    const res = await req;
    return res.data["models"];
}

/**
 * Perform prediction for a text input.
 * @param {number} modelId The model id you want to use for prediction.
 * @param {Array<string>} utterances Array of text for which you want a prediction.
 * @returns {Array<{
 *  spellChecked: string
 *  detectedLanguage: string
 *  entities: Array<{
 *    name: string
 *    type: string
 *    unit: string
 *    value: string
 *    sensitive: boolean
 *    confidence: number
 *    start: number
 *    end: number
 *    source: string
 *  }>
 *  contexts: Array<{
 *    name: string
 *    confidence: number
 *    oos: number
 *    intents: Array<{
 *      name: string
 *      confidence: number
 *      extractor: string
 *      slots: Array<{
 *        start: number
 *        end: number
 *        confidence: number
 *        name: string
 *        source: string
 *        value: string
 *        entity: {
 *          name: string
 *          type: string
 *          unit: string
 *          value: string
 *          sensitive: boolean
 *          confidence: number
 *          start: number
 *          end: number
 *          source: string
 *        }
 *      }>
 *    }>
 *  }>
 * }>} predictions Array of predictions; Each prediction is a data structure reprensenting our understanding of the text.
 */
export async function predict(modelId, utterances) {
    const req = axiosInstance.post(`${PREDICT_URL}/${modelId}`, {utterances: utterances});
    const res = await req;
    return res.data["predictions"];
}
